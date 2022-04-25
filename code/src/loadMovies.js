import {
  tickFormat
} from 'd3'
import * as d3 from 'd3';
let numeral = require('numeral'); // LANCER 'npm install numeral' POUR QUE ÇA MARCHE


const TitlesArray = []
const IntroductionArray = []
const StudiosArray = []
const ReleaseArray = []
const DomSalesArray = []
const IntSalesArray = []
const WorldSalesArray = []
const GenreArray = []
const RuntimeArray = []
const API_KEY = '24cd33d154dc43bf62799d9af836baa3'
const API_QUERY = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query="
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
const TEMPLATE_MOVIE_DETAIL = document.getElementById('movieDetailTemplate')
const movieDetail = document.getElementById('movieDetails')

async function loadJson(url) {
  const response = await fetch(url)
  const parsedJson = await response.json()
  const posterURL = parsedJson.results[0].poster_path;
  return posterURL;
}

function getMovies() {
  const Movies = require('../assets/movies.json')
  return Movies
}

// export async function getMovieByTitle(title){
//   title = title.replaceAll('-', ' ');
//   const movies = getMovies()
//   const movie = movies.find(movie => movie.Title === title)
//   return movie
// }

async function renderMovies(movies) {
  for (const movie of movies) {
    const movieTitle = movie.Title.slice(0, movie.Title.length - 7)
    const moviePoster = await loadJson(API_QUERY + movieTitle.replaceAll(' ', '+'))
    renderMovie(movieTitle, moviePoster)
  }
}

export async function renderMovieDetails(event=false, movie){
  // console.log(movie.Title)
  const newMovieDetail = TEMPLATE_MOVIE_DETAIL.content.cloneNode(true)
  const closeButton = newMovieDetail.querySelector('#closeDetails');
  const titleWithoutYear = movie.Title.endsWith(')')? movie.Title.slice(0, movie.Title.length - 7) : movie.Title
  const posterURL = await loadJson(API_QUERY + titleWithoutYear.replaceAll(' ', '+'));
  const movieGenresArray = movie.Genre.substring(
    movie.Genre.indexOf('[') + 1,
    movie.Genre.lastIndexOf(']')).replaceAll("'", "").replaceAll(" ", "").split(",");
    movieGenresArray.forEach(genre => {
      const p = document.createElement('p')
      p.classList.add(genre)
      p.textContent = genre;
      newMovieDetail.querySelector('.genre').appendChild(p);
    });
  newMovieDetail.querySelector('img').setAttribute('src', POSTER_BASE_URL + posterURL);
  newMovieDetail.querySelector('h2').textContent = movie.Title;
  newMovieDetail.querySelector('.description').textContent = movie['Movie Info'];
  newMovieDetail.querySelector('.studio').textContent = movie.Distributor;
  newMovieDetail.querySelector('.runtime').textContent = movie['Movie Runtime'];
  newMovieDetail.querySelector('.WorldSales').textContent = numeral(movie['World Sales (in $)']).format("$0,0");
  newMovieDetail.querySelector('.DomesticSales').textContent = numeral(movie['Domestic Sales (in $)']).format("$0,0");
  closeButton.addEventListener('click', () => {
    document.getElementById('my_slider').classList.remove('hidden');
    movieDetail.classList.add('hidden');
  })
  movieDetail.replaceChildren(newMovieDetail);
  document.getElementById('my_slider').classList.add('hidden');
  movieDetail.classList.remove('hidden');
}

function renderMovie(movieTitle, moviePoster) {
  const newMovie = movieListItemTemplate.content.cloneNode(true)
  newMovie.querySelector('img').setAttribute('src', POSTER_BASE_URL + moviePoster)
  newMovie.querySelector('p').textContent = movieTitle;
  movieList.append(newMovie)
}

export function getTitles() {
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    TitlesArray.push(Movies.Title)

  })
  return TitlesArray
}

export function getSummary() {
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    IntroductionArray.push(Movies['Movie Info'])

  })
  return IntroductionArray
}

export function getStudio() {
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    StudiosArray.push(Movies.Distributor)

  })
  return StudiosArray
}

export function getRelease() {
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    ReleaseArray.push(Movies['Release Date'])

  })
  return ReleaseArray
}

export function getDomSales() {
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    DomSalesArray.push(Movies['Domestic Sales (in $)'])

  })
  return DomSalesArray
}

export function getIntSales() {
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    IntSalesArray.push(Movies['International Sales (in $)'])

  })
  return IntSalesArray
}

export function getWorldSales() {
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    WorldSalesArray.push(Movies['World Sales (in $)'])

  })
  return WorldSalesArray
}

export function getGenre() {
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    GenreArray.push(Movies.Genre)

  })
  return GenreArray
}

export function getRunTime() {
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    RuntimeArray.push(Movies['Movie Runtime'])

  })
  return RuntimeArray
}

//function that prints all unique distributors from movies.json
export function getDistributors() {
  const DistributorsArray = [];
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    DistributorsArray.push(Movies.Distributor)

  })
  return [...new Set(DistributorsArray)]
}

export function getDistributorsForYear(year) {
  const DistributorsArray = [];
  const Movies = getMovies()
  Movies.map((Movies, i) => {
    if (Movies['Title'].includes('(' + year + ')')) {
      DistributorsArray.push(Movies.Distributor)
    }
  })
  return [...new Set(DistributorsArray)]
}

export function getMoviesForYear(year) {
  const Movies = getMovies()
  const MoviesArray = [];
  Movies.map((Movies, i) => {
    if (Movies['Title'].includes('(' + year + ')')) {
      MoviesArray.push(Movies)
    }
  })
  return MoviesArray
}