import * as d3 from 'd3';
import file from '../assets/movies.json'
const API_KEY = '24cd33d154dc43bf62799d9af836baa3'
const API_QUERY = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query="
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
let postersURL = [];
const movieList = document.querySelector('.list')
const movieListItemTemplate = document.getElementById('movieList').cloneNode(true);


renderMovies(file);

// const titles = file.map((d) => {
//     return d.Title.slice(0, d.Title.length - 7);
// })
// // console.log(titles[0]);
// showPosterTitle(titles)
// // console.log(postersURL)
// // showPosterTitle(titles, postersURL)

// function getPosters(titles) {
//     const posters = [];
//     titles.map((title, i) => {
//         d3.json(API_QUERY + title.replaceAll(' ', '+')).then(function (data) {
//             posters.push(POSTER_BASE_URL + data.results[0].poster_path)
//         }).then(function () {
//             if (posters.length >= titles.length) {
//                 // console.log(JSON.stringify(Object.assign({}, posters)))
//                 return posters
//             }
//         })
//     });
//     // console.log(titles)
//     // console.log(posters.findIndex((element)=>element == "https://image.tmdb.org/t/p/original/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg"))
//     // return posters;
// }

// async function showPosterTitle(titles) {
//     const template = document.querySelector('#movieList')
//     const movieList = []
//     // console.log(titles);
//     // console.log(posters);
//     const posters = getPosters(titles).then(function () {
//         for (let index = 0; index < titles.length; index++) {
//             const newMovie = template.content.cloneNode(true);
//             // console.log(newMovie.querySelector('img'));
//             newMovie.querySelector('.poster').src = posters[index]
//             newMovie.querySelector('p').textContent = titles[index];
//             movieList.push(newMovie);
//         }
//         document.querySelector('.movieList').replaceChildren(movieList);
//     })

// }

// function showPosterTitle() {
//     const postersURL = []
//     const template = document.querySelector('#movieList')
//     const movieList = []
//     const titles = file.map((d) => {
//         return d.Title.slice(0, d.Title.length - 7);
//     })
//     titles.forEach(title => {
//         d3.json(API_QUERY + title.replaceAll(' ', '+')).then(function (data) {
//             postersURL.push(POSTER_BASE_URL + data.results[0].poster_path)
//         }).then(function (data) {
//             if (postersURL.length >= titles.length) {
//                 console.log(postersURL)
//                 for (let index = 0; index < titles.length; index++) {
//                     const newMovie = template.content.cloneNode(true);
//                     newMovie.querySelector('.poster').src = posters[index]
//                     newMovie.querySelector('p').textContent = titles[index];
//                     movieList.push(newMovie);
//                 }
//                 document.querySelector('.movieList').replaceChildren(movieList);
//             }
//         })
//     });
// }

async function loadJson(url) {
    const response = await fetch(url)
    console.log(url)
    const parsedJson = await response.json()
    console.log(parsedJson)
    const posterURL = parsedJson.results[0].poster_path;
    return posterURL;
}

async function renderMovies(movies) {
    for (const movie of movies) {
        const movieTitle = movie.Title.slice(0, movie.Title.length - 7)
        const moviePoster = await loadJson(API_QUERY + movieTitle.replaceAll(' ', '+'))
        renderMovie(movieTitle, moviePoster)
    }
}

async function renderMovie(movieTitle, moviePoster) {
    const newMovie = movieListItemTemplate.content.cloneNode(true)
    newMovie.querySelector('img').setAttribute('src', POSTER_BASE_URL + moviePoster)
    newMovie.querySelector('p').textContent = movieTitle;
    movieList.append(newMovie)
  }
import * as Movies from './loadMovies';
 
const TitlesArray = []
const IntroductionArray = []
const StudiosArray = []
const ReleaseArray = []
const DomSalesArray = []
const IntSalesArray = []
const WorldSalesArray = []
const GenreArray = []
const RuntimeArray = []

console.log(Movies.getDomSales())
