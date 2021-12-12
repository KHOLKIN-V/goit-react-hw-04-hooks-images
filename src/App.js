import { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";

import cs from './App.module.css';
import { mapper } from "./service/mapper";
import fetchApi from "./service/fetchApi";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [viewModal, setViewModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    setImages([]);
    getImages(searchQuery, page);
  }, [searchQuery])

  useEffect(() => {
    getImages(searchQuery, page);
  }, [page])

  const getImages = (query, page) => {
    setStatus('pending');
    fetchApi(query, page)
    .then((hits) => {
        setImages([...images, mapper(hits)]);
        setStatus('resolved');
      })
    .catch(({message}) => {
      setError(message);
      setStatus('rejected'); 
    })
    .finally(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const loadMore = e => {
    e.preventDefault();
    setPage(i => i + 1);
  }

  const formSubmit = query => {
    setSearchQuery(query);
    setPage(1);
  }

  const toggleModal = () => {
    setViewModal(!viewModal);

  };

  const openImage = (largeImage) => {
    setModalImage(largeImage);
    toggleModal();
  }

  return (
    <>
    <div className={cs.App}>
      <Searchbar onSubmit={formSubmit}/>
      {(status === 'idle') &&
        <div style={{fontWeight: '500', fontSize: '30px', textAlign: 'center'}}>Введите название</div>
      }
      {(status === 'rejected') &&
        <div style={{fontWeight: '700', fontSize: '50px', textAlign: 'center'}}>{error}</div>
      }
      {(images.length > 0) && 
        <>
          <ImageGallery onSearch={images} openImage={openImage} />
          <Button onClick={loadMore} page={page} />
        </>
      }
      {(status === "pending") && 
        <Loader
          type="Puff"
           color="#00BFFF"
           height={100}
           width={100}
           timeout={3000} //3 secs
        />
      }
      {viewModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt='' />
        </Modal>
      )}
    </div>
    </>
  )
};
