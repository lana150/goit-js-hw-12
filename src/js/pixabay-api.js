import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios, { Axios } from 'axios';

export let per_page = 15;

export async function fetchImages(query, currentPage = 1) {
  const BASE_URL = 'https://pixabay.com/api/?key=';
  const API_KEY = '46052576-a4ef4f0d52180e04b4399e04b';

  const params = new URLSearchParams({
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: per_page,
    page: currentPage,
  });

  const response = await axios.get(`${BASE_URL}${API_KEY}&${params}`);
  const {
    data: { hits, totalHits },
  } = response;
  return { hits, totalHits };
}