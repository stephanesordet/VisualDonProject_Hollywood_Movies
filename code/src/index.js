import * as d3 from 'd3';
import {
  pointers
} from 'd3-selection';
import file from '../assets/movies.json'
// import * as Movies from './loadMovies';

import {
  moviesToCircles
} from './loadMovies';
const API_KEY = '24cd33d154dc43bf62799d9af836baa3'
const API_QUERY = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query="
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
let postersURL = [];
const movieList = document.querySelector('.list')
const movieListItemTemplate = document.getElementById('movieList').cloneNode(true);
d3.select('body').append('div').attr('id', 'my_dataviz');

// d3.select('body').append('h1').text('TEST')

// drawGraph()

const svgGraph = d3.select('#my_dataviz').append('svg').attr('class', 'graph')

let tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")
// moviesToCircles(Movies);

// A function that change this tooltip when the user hover a point.
// Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
var mouseover = function (d) {
  tooltip
    .style("opacity", 1)
}

var mousemove = function (d) {
  console.log(d)
  tooltip
    .html("The exact value of<br>the Ground Living area is: " + d[Title])
    .style("left", (d3.pointers(this)[0] + 90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    .style("top", (d3.pointers(this)[1]) + "px")
}

// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
var mouseleave = function (d) {
  tooltip
    .transition()
    .duration(200)
    .style("opacity", 0)
}

const margin = {
    top: 50,
    right: 10,
    bottom: 0,
    left: 100
  },
  width = window.innerWidth * 0.7 - margin.left - margin.right,
  height = window.innerHeight * 0.9 - margin.top - margin.bottom;

svgGraph.attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
const x = d3.scaleLinear()
  .domain([1977, 2021])
  .range([10, width])

svgGraph.append('g')
  .attr("transform", "translate(5," + height + ")")
  .call(d3.axisTop(x).ticks(44).tickSize(10)).selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-0.6em")
  .attr("dy", "2.4em")
  .attr("transform", "rotate(-65)");;

const y = d3.scalePow()
  .exponent(0.5)
  .domain([70000000, 2847246203])
  .range([height, 0 + 10])

svgGraph.append('g')
  .call(d3.axisRight(y).ticks(20));

svgGraph.append('g')
  .attr("transform", "translate(5,0)")
  .attr('class', 'all-movies')
  .selectAll("circle")
  .data(file)
  .enter()
  .append("circle")
  .attr('cx', f => x(parseInt(f.Title.substring(f.Title.length - 5, f.Title.length - 1))))
  .attr('cy', f => y((f['World Sales (in $)'])))
  .attr('r', 7)
  .attr('fill', f => {
    let themes = f.Genre.substring(
      f.Genre.indexOf('[') + 1,
      f.Genre.lastIndexOf(']')
    )
    let genre = themes.split(' ')
    genre = genre[0].substring(
      genre[0].indexOf("'") + 1,
      genre[0].lastIndexOf("'")
    )
    switch (genre) {
      case 'Action':
        return '#B3494C';
        break;
      case 'Adventure':
        return '#206632';
        break;
      case 'Animation':
        return '#C7541A';
        break;
      case 'Comedy':
        return '#1B8287';
        break;
      case 'Crime':
        return '#1F5F5B';
        break;
      case 'Documentary':
        return '#159947';
        break;
      case 'Drama':
        return '#703D00';
        break;
      case 'Family':
        return '#991C15';
        break;
      case 'Fantasy':
        return '#49B265';
        break;
      case 'History':
        return '#49ABA4';
        break;
      case 'Horror':
        return '#06373A';
        break;
      case 'Music':
        return '#1B8287';
        break;
      case 'Mystery':
        return '#A43600';
        break;
      case 'Romance':
        return '#0A5070';
        break;
    }
  })
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)
// .on("mouseover", function(f){
//   console.log(42)
//   tooltip.style("opacity", 1)
//   d3.select(this)
//     .style("stroke", "black")
//     .style("opacity", 1)
// })
// .on("mousemove", f => {
//   tooltip.html("The exact value of<br>this cell is: " + f.Title)
//   .style("left", (d3.pointer(this)[0]+70) + "px")
//   .style("top", (d3.pointer(this)[1]) + "px")
// })
// .on("mouseleave", f => {
//   tooltip.style("opacity", 0)
//   d3.select(this)
//     .style("stroke", "none")
//     .style("opacity", 0.8)
// })


async function loadJson(url) {
  const response = await fetch(url)
  const parsedJson = await response.json()
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

const TitlesArray = []
const IntroductionArray = []
const StudiosArray = []
const ReleaseArray = []
const DomSalesArray = []
const IntSalesArray = []
const WorldSalesArray = []
const GenreArray = []
const RuntimeArray = []