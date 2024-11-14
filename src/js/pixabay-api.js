import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function fetchImages(query) {
  const BASE_URL = 'https://pixabay.com/api/?key=';
  const API_KEY = '46052576-a4ef4f0d52180e04b4399e04b';

  return fetch(
    `${BASE_URL}${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=30`
  ).then(response => {
    if (!response.ok) {
      iziToast.error({
        message: 'Something went wrong',
        position: 'bottomRight',
      });
    }
    return response.json();
  });
}