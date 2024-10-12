const apiKey = 'f82af9d2067f147bc7095c5822a05ece'; 
const baseURL = 'https://api.themoviedb.org/3';

document.getElementById('search-btn').addEventListener('click', function() {
    const movieTitle = document.getElementById('movie-title').value;
    if (movieTitle) {
        fetchMovieDetails(movieTitle);
    }
});

function fetchMovieDetails(title) {
    const url = `${baseURL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movie = data.results[0];
            if (movie) {
                displayMovieDetails(movie);
                fetchSimilarMovies(movie.id);
            } else {
                document.getElementById('movie-details').innerHTML = 'Movie not found';
            }
        })
        .catch(error => console.log('Error fetching movie details:', error));
}

function displayMovieDetails(movie) {
    const movieDetailsDiv = document.getElementById('movie-details');
    movieDetailsDiv.innerHTML = `
        <div>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="details">
                <h2>${movie.title} (${movie.release_date.substring(0, 4)})</h2>
                <p><strong>Rating:</strong> ${movie.vote_average}</p>
                <p><strong>Plot:</strong> ${movie.overview}</p>
            </div>
        </div>
    `;
}

function fetchSimilarMovies(movieId) {
    const url = `${baseURL}/movie/${movieId}/similar?api_key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySimilarMovies(data.results);
        })
        .catch(error => console.log('Error fetching similar movies:', error));
}

function displaySimilarMovies(movies) {
    const similarMoviesDiv = document.getElementById('similar-movies');
    similarMoviesDiv.innerHTML = '<h3>Similar Movies</h3>';
    
    movies.forEach(movie => {
        similarMoviesDiv.innerHTML += `
            <div>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" style="width: 100px;">
                <p>${movie.title}</p>
            </div>
        `;
    });
}
