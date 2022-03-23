import * as d3 from 'd3';
import file from '../assets/movies.json'
import * as Movies from './loadMovies';
const API_KEY = '24cd33d154dc43bf62799d9af836baa3'
const API_QUERY = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query="
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
let postersURL = [];
const movieList = document.querySelector('.list')
const movieListItemTemplate = document.getElementById('movieList').cloneNode(true);

d3.select('body').append('h1').text('TEST')
const svgGraph = d3.select('body').append('svg').attr('class', 'graph')



// renderMovies(file);

const margin = {top : 50, right: 10, bottom: 0, left: 100},
		   width = window.innerWidth*0.7 - margin.left - margin.right,
		   height = window.innerHeight*0.9 - margin.top - margin.bottom;
 
svgGraph.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
const x = d3.scaleLinear()
		.domain([1976,2021])
		.range([0,width])
 
svgGraph.append('g')
  .attr("transform", "translate(5," + height + ")")
  .call(d3.axisTop(x).ticks(45).tickSize(10)).selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-0.6em")
            .attr("dy", "2.4em")
            .attr("transform", "rotate(-65)" );;
 
const y = d3.scaleLinear()
		.domain([0,20])
		.range([height,0+10])
 
svgGraph.append('g')
  .call(d3.axisRight(y).ticks(20));


/**
 * It takes in a URL and returns the poster URL.
 * @param url - The URL of the API endpoint you want to request.
 * @returns The URL of the poster image.
 */
async function loadJson(url) {
    const response = await fetch(url)
    const parsedJson = await response.json()
    const posterURL = parsedJson.results[0].poster_path;
    return posterURL;
}

/**
 * Given a list of movies, render each movie's title and poster image
 * @param movies - an array of movie objects
 */
async function renderMovies(movies) {
    for (const movie of movies) {
        const movieTitle = movie.Title.slice(0, movie.Title.length - 7)
        const moviePoster = await loadJson(API_QUERY + movieTitle.replaceAll(' ', '+'))
        renderMovie(movieTitle, moviePoster)
    }
}

/**
 * It creates a new movie list item and appends it to the movie list.
 * @param movieTitle - The title of the movie to be displayed.
 * @param moviePoster - The URL of the movie poster.
 */
async function renderMovie(movieTitle, moviePoster) {
    const newMovie = movieListItemTemplate.content.cloneNode(true)
    newMovie.querySelector('img').setAttribute('src', POSTER_BASE_URL + moviePoster)
    newMovie.querySelector('p').textContent = movieTitle;
    movieList.append(newMovie)
  } 
 
const TitlesArray = []
const IntroductionArray = []
const StudiosArray = []
const ReleaseArray = []
const DomSalesArray = []
const IntSalesArray = []
const WorldSalesArray = []
const GenreArray = []
const RuntimeArray = []
