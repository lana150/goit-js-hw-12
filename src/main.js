import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages, per_page } from './js/pixabay-api.js';
import { handleSuccess } from './js/render-functions.js';

const library = new SimpleLightbox('.gallery a', {
  captionDelay: 300,
  captionsData: 'alt',
});

export const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  button: document.querySelector('.gallery-button'),
};

refs.form.addEventListener('submit', handleSubmit);
refs.button.addEventListener('click', handleButtonShowMore);

let query = '';
let page = 1;

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const inputValue = form.elements.state.value.trim();

  query = inputValue;
  page = 1;
  refs.gallery.innerHTML = '';
  refs.button.classList.remove('is-visible');

  if (!inputValue) {
    iziToast.error({
      message: 'Please enter your request',
      position: 'bottomRight',
    });
    refs.button.classList.remove('is-visible');
    return;
  }
  refs.loader.classList.add('is-visible');

  try {
    const { hits } = await fetchImages(query, page);

    if (hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomRight',
      });
      return;
    }

    hits.length < per_page
      ? refs.button.classList.remove('is-visible')
      : refs.button.classList.add('is-visible');

    const markup = handleSuccess(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    library.refresh();
  } catch (error) {
    iziToast.error({
      message: `Please try again later`,
      position: `bottomRight`,
    });
  } finally {
    refs.loader.classList.remove('is-visible');
    refs.form.reset();
  }
}

async function handleButtonShowMore() {
  page += 1;

  try {
    refs.loader.classList.add('is-visible');
    refs.button.classList.remove('is-visible');
    const { hits, totalHits } = await fetchImages(query, page);

    const markup = handleSuccess(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    library.refresh();
    handlePageScroll();
    if (page > Math.ceil(totalHits / per_page) - 1) {
      refs.button.classList.remove('is-visible');
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomRight',
      });
      return;
    }
    refs.button.classList.add('is-visible');
  } catch (error) {
    iziToast.error({
      message: `Please try again later`,
      position: `bottomRight`,
    });
  } finally {
    refs.loader.classList.remove('is-visible');
  }
}

function handlePageScroll() {
  const heightCard = refs.gallery.querySelector('li');
  const cardHeight = heightCard.getBoundingClientRect().height;
  const additionalOffset = 140;
  const scrollHeight = cardHeight * 2 + additionalOffset;

  window.scrollBy({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}