window.onload = () => {

  
  //const searchInput = encodeURIComponent(document.getElementById('search-input').value.trim());
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchAPI();
    }
});

  // const searchButton = document.querySelector('search-button');
  // searchButton.addEventListener('click', () => {
  //   searchAPI;
  // });
  
  


  function searchAPI() {
    const url = 'https://images-api.nasa.gov/search?';
    const q = encodeURI(searchInput.value);
    const fetchURL = url + "q=" + q + "&media_type=image";
    fetchAPI(fetchURL);
  }

  function fetchAPI(url) {
    fetch(url) 
    .then(response => {
      if(!response.ok) {
        throw new Error('Failed. Status: ${response.status}')
      }
      return response.json();
    })
    .then(data => {
      //removeAllChildNodes(document.getElementById('image-grid'));
      createImageElements(data.collection.items);
    });
  }

  function createImageElements(items) {
    let iteration = 0; 
    for (let i of items) {
        const newImg = document.createElement('img');
        newImg.src = i.links[0].href;
        newImg.id = 'img' + iteration;
        newImg.style.width = '100%';

        newImg.addEventListener("click", function() {
            showImgData(i, newImg.id)
        })

        for (i=0; i <= 101; i++) {
          const display = document.querySelector('.image-grid')
          display.appendChild(newImg);
           
        }
        iteration += 1;
        
                             
    } 
    setTimeout(() => {
        document.querySelector(".row").scrollIntoView({behavior: "smooth"});
    }, 500)
};
};

