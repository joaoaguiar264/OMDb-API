let formulario = document.querySelector('.formulario')
let searchInput = document.querySelector('.searchInput')
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const apiKey = 'e6c43dc6';
let currentPage = 1;

prevPageButton.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      Search();
    }
  });

nextPageButton.addEventListener('click', function() {
    currentPage++;
    Search();
});
  
formulario.addEventListener('submit', async (event) =>{
    event.preventDefault();
    currentPage = 1;
    Search();
    
})

function Search(){
    const resultsContainer = document.getElementById('results');
    const searchTerm = searchInput.value;
    
    const apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}&page=${currentPage}`;
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        resultsContainer.innerHTML = '';

        if (data.Error) {
            resultsContainer.innerHTML = `<p>${data.Error}</p>`;
            console.error(data.Error);
        } else {
            const movies = data.Search;
            
            if (movies && movies.length > 0) {
                movies.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const movieTitle = document.createElement('p');
                movieTitle.textContent = `${movie.Title}`;

                const moviePoster = document.createElement('img');
                moviePoster.src = movie.Poster;
                moviePoster.alt = `Poster for ${movie.Title}`;

                movieDiv.appendChild(movieTitle);
                movieDiv.appendChild(moviePoster);
                resultsContainer.appendChild(movieDiv);
                });
            } else {
                resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            }
        }
    })
    .catch(error => {
    console.error('Ocorreu um erro ao buscar dados da API:', error);
    });
}




