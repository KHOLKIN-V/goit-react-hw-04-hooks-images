import React from "react";
import PropTypes from "prop-types";
import cs from "./ImageGalleryItem.module.css";
// import Modal from "../Modal/Modal";

const ImageGalleryItem = ({ webformatURL, id, openImage, largeImageURL }) => {
  return (
    <li
      className={cs.ImageGalleryItem}
      key={id}
      onClick={() => {
        openImage(largeImageURL);
      }}
    >
      <img src={webformatURL} alt="" className={cs.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
