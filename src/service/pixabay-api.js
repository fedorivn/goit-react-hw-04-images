import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33108059-d52855214b2d0e29937d759f2';
const OPTIONS = 'image_type=photo';

async function fetchImages(query, page) {
  const response = await axios(
    `${BASE_URL}?key=${API_KEY}&q=${query}&${OPTIONS}&page=${page}&per_page=12`
  );

  return response.data;
}

export default fetchImages;
