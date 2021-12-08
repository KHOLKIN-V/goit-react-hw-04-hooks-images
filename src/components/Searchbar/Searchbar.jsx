import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import cs from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const imageChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const imageSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      toast.warn("Введите запрос!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <>
      <header className={cs.Searchbar}>
        <form className={cs.SearchForm} onSubmit={imageSubmit}>
          <button type="submit" className={cs.SearchFormBtn}>
            <span className={cs.SearchFormBtnLabel}>Search</span>
          </button>

          <input
            className={cs.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={imageChange}
          />
        </form>
      </header>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export default Searchbar;
