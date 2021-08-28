(function () {
  const buttons = document.querySelectorAll('.btn');
  const items = document.querySelectorAll('.grid-item');
  const searchBox = document.querySelector('#input');
  const images = document.querySelectorAll('.image');
  const imageList = [];
  const modal = document.querySelector('.modal');
  const modalImageContainer = document.querySelector('.modal-image-container');
  const closeButton = document.querySelector('#close-btn');
  const leftButton = document.querySelector('#left-btn');
  const rightButton = document.querySelector('#right-btn');

  let imageCounter = 0;

  function filterByButton() {
    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        items.forEach((item) => {
          if (item.dataset.item === button.value) {
            item.style.display = 'block';
          } else if (button.value === 'all') {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  filterByButton();

  function filterBySearch() {
    searchBox.addEventListener('keyup', function () {
      items.forEach((item) => {
        const itemText = item.textContent.toLowerCase().trim();

        if (itemText.includes(searchBox.value)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
  filterBySearch();

  function loadItemImage() {
    images.forEach((image) => {
      imageList.push(image.src);
    });

    items.forEach((item) => {
      item.addEventListener('click', function (e) {
        const image = e.target.src;
        modalImageContainer.style.backgroundImage = `url(${image})`;
        modal.style.visibility = 'visible';
        imageCounter = imageList.indexOf(image);
      });
    });
  }
  loadItemImage();

  function closeModal() {
    modal.style.visibility = 'hidden';
  }

  function displayPreviousImage() {
    imageCounter--;

    if (imageCounter < 0) {
      imageCounter = imageList.length - 1;
    }

    modalImageContainer.style.backgroundImage = `url(${imageList[imageCounter]})`;
  }

  function displayNextImage() {
    imageCounter++;

    if (imageCounter > imageList.length - 1) {
      imageCounter = 0;
    }

    modalImageContainer.style.backgroundImage = `url(${imageList[imageCounter]})`;
  }

  closeButton.addEventListener('click', closeModal);
  leftButton.addEventListener('click', displayPreviousImage);
  rightButton.addEventListener('click', displayNextImage);
})();
