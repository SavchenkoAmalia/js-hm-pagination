const API_KEY = '50349869-5defc6dcfd8769dd78c6ee458';
const PER_PAGE = 12;
let currentPage = 1;

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

async function fetchImages(page = 1) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&editors_choice=true&image_type=photo&page=${page}&per_page=${PER_PAGE}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Помилка завантаження даних');
  const data = await response.json();
  return data.hits;
}

function renderImages(images) {
  const markup = images.map(img => `
    <div class="photo-card">
      <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      <p>Автор: ${img.user}</p>
      <p>Переглядів: ${img.views}</p>
    </div>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

async function loadInitialImages() {
  try {
    const images = await fetchImages(currentPage);
    renderImages(images);
  } catch (error) {
    console.error(error);
  }
}

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  try {
    const images = await fetchImages(currentPage);
    if (images.length === 0) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'Більше зображень немає';
    } else {
      renderImages(images);
    }
  } catch (error) {
    console.error(error);
  }
});

loadInitialImages();
