// import { createClient } from 'pexels';
import axios from 'axios';
import PropTypes from 'prop-types';

const fetchApi = (onSearch, page) => {
    const KEY = '23540071-e77d0cd4225c02caa21321106';
    const BASE_URL = 'https://pixabay.com/api/';
    return axios.get(`${BASE_URL}?q=${onSearch}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(r => r.data.hits);
};

// const fetchApi = (onSearch, page) => {
//     const client = createClient('563492ad6f9170000100000187edd7a1e3164e24b88262e5ea6f2f2b');
//     const query = onSearch;

//     return client.photos.search({ query, page: page, per_page: 12 }).then(photos => photos.json());
// };

// const fetchApi = (onSearch, page) => {
//     const KEY = 'a92e1c28ff5839246667e5b68c28f141';
//     const BASE_URL = 'https://api.themoviedb.org/3/';
//     const language = 'en-US';
//     return axios.get(`${BASE_URL}search/movie?api_key=${KEY}&language=${language}&page=${page}&per_page=12&include_adult=false&query=${onSearch}`).then(r => r.data.results);
// };
fetchApi.propTypes = {
    onSearch: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
};

export default fetchApi;
