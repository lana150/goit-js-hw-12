import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { handleSuccess } from './js/render-functions.js';

export const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

const library = new SimpleLightbox('.gallery a', {
  captionDelay: 300,
  captionsData: 'alt',
});

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const inputValue = form.elements.state.value.trim();

  refs.gallery.innerHTML = '';

  if (!inputValue) {
    iziToast.error({
      message: 'Please enter your request',
      position: 'bottomRight',
    });
    return;
  }

  refs.loader.style.display = 'inline-block';

  fetchImages(inputValue)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'bottomRight',
        });
        refs.loader.style.display = 'none';
        return;
      }
      const markup = handleSuccess(data.hits);
      refs.gallery.insertAdjacentHTML('beforeend', markup);

      library.refresh();
      refs.loader.style.display = 'none';
    })
    .catch(error => {
      console.log(error.message);
    });
}