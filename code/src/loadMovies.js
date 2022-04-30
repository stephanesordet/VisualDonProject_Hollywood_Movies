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

export function getInflatedWorldSales(){
  const inflationDictionary = {
    '1970': 6.21,
    '1972': 5.75,
    '1973': 5.42,
    '1975': 4.48,
    '1977': 3.98,
    '1978': 3.7,
    '1979': 3.32,
    '1980': 2.92,
    '1981': 2.65,
    '1982': 2.5,
    '1983': 2.42,
    '1984': 2.32,
    '1985': 2.24,
    '1986': 2.2,
    '1987': 2.12,
    '1988': 2.04,
    '1989': 1.94,
    '1990': 1.84,
    '1991': 1.77,
    '1992': 1.72,
    '1993': 1.67,
    '1994': 1.63,
    '1995': 1.58,
    '1996': 1.54,
    '1997': 1.5,
    '1998': 1.48,
    '1999': 1.45,
    '2000': 1.4,
    '2001': 1.36,
    '2002': 1.34,
    '2003': 1.31,
    '2004': 1.28,
    '2005': 1.23,
    '2006': 1.2,
    '2007': 1.16,
    '2008': 1.12,
    '2009': 1.12,
    '2010': 1.1,
    '2011': 1.07,
    '2012': 1.05,
    '2013': 1.03,
    '2014': 1.02,
    '2015': 1.02,
    '2016': 1,
    '2017': 1,
    '2018': 1,
    '2019': 1,
    '2020': 1,
    '2021': 1,
    '2022': 1
  }
  const inflationArray = [];
  const Movies = getMovies();
  Movies.map((Movies, i) => {
    const year = Movies.Title.substring(Movies.Title.length - 5, Movies.Title.length - 1)
    inflationArray.push(Movies['World Sales (in $)']*inflationDictionary[year])
  })
  inflationArray.sort((a, b) => a - b);
  return inflationArray
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

export function getYears(){
  const Movies = getMovies()
  const YearsArray = [];
  Movies.map((Movies, i) => {
    YearsArray.push(Movies.Title.substring(Movies.Title.length - 5, Movies.Title.length - 1))
  })
  YearsArray.sort((a, b) => a - b);
  return [...new Set(YearsArray)];
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