const curated_photo_url =
  "https://api.pexels.com/v1/curated?per_page=16&page=1";

const auth = "563492ad6f91700001000001741113c5bb584c6e94c6b8e3c7debb7c";
const search_endPoint =
  "https://api.pexels.com/v1/search?query=nature&per_page=1";

//Selectors
const gallery = document.querySelector(".gallery");
const searchhInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
const showMore = document.querySelector(".more-button");
const showMoreSearched = document.querySelector(".more-searched");
let searchValue = searchhInput.value;
let page = 1;
let fecthLink;

//Event Listners
searchhInput.addEventListener("input", updateInput);
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchImage(searchValue);
  searchhInput.value = "";
});
if (showMore) {
  showMore.addEventListener("click", loadMore);
}
if (showMoreSearched) {
  showMoreSearched.addEventListener("click", loadMoreSearched);
}

//fetch Data
async function fetchCurated() {
  const response = await fetch(`${curated_photo_url}`, {
    method: "GET",
    headers: {
      Authorization: auth,
    },
  });
  const data = await response.json();

  data.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-image");
    galleryImage.innerHTML = `<div class="overlay-container"><img class="fetched-images" src=${photo.src.large} alt=${photo.alt}/> <div class='download-container'><p class="name"> <a href=${photo.photographer_url}>${photo.photographer}</a></p> <p><a href=${photo.src.original}> <i class="fa-solid download-icon fa-download"></i></a></p></div></div>`;
    gallery.appendChild(galleryImage);
    showMoreSearched.style.visibility = "hidden";
  });
}

async function searchImage(query) {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=16&page=1`,
    {
      method: "GET",
      headers: {
        Authorization: auth,
      },
    }
  );
  const data = await response.json();

  gallery.innerHTML = "";
  data.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-image");
    galleryImage.innerHTML = `<div class="overlay-container"><img class="fetched-images" src=${photo.src.large} alt=${photo.alt}/> <div class='download-container'><p class="name"> <a  href=${photo.photographer_url}>${photo.photographer}</a></p> <p><a href=${photo.src.original}> <i class="fa-solid fa-download download-icon"></i></a></p></div></div>`;
    gallery.appendChild(galleryImage);
    showMore.style.visibility = "hidden";
    showMoreSearched.style.visibility = "visible";
    showMoreSearched.innerHTML = `Show more '${searchValue}'`;
  });
}

function updateInput(event) {
  searchValue = event.target.value;
}

async function loadMore() {
  page++;
  if (curated_photo_url) {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?per_page=10&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: auth,
        },
      }
    );
    const data = await response.json();
    data.photos.forEach((photo) => {
      const galleryImage = document.createElement("div");
      galleryImage.classList.add("gallery-image");
      galleryImage.innerHTML = `<div class="overlay-container"><img class="fetched-images" src=${photo.src.large} alt=${photo.alt}/> <div class='download-container'><p class="name"> <a href=${photo.photographer_url}>${photo.photographer}</a></p> <p><a href=${photo.src.original}> <i class="fa-solid download-icon fa-download"></i></a></p></div></div>`;
      gallery.appendChild(galleryImage);
    });
  }
}

async function loadMoreSearched() {
  page++;

  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${searchValue}&per_page=16&page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: auth,
      },
    }
  );
  const data = await response.json();
  data.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-image");
    galleryImage.innerHTML = `<div class="overlay-container"><img class="fetched-images" src=${photo.src.large} alt=${photo.alt}/> <div class='download-container'><p class="name"> <a href=${photo.photographer_url}>${photo.photographer}</a></p> <p><a href=${photo.src.original}> <i class="fa-solid download-icon fa-download"></i></a></p></div></div>`;
    gallery.appendChild(galleryImage);
  });
}

fetchCurated();
searchImage(searchValue);
