import * as d3 from 'd3';
import file from '../assets/movies.json'
import * as Movies from './loadMovies';
import {
  moviesToCircles
} from './loadMovies';
const API_KEY = '24cd33d154dc43bf62799d9af836baa3'
const API_QUERY = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query="
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
let postersURL = [];
const movieList = document.querySelector('.list')
const movieListItemTemplate = document.getElementById('movieList').cloneNode(true);

d3.select('body').append('h1').text('TEST')

// drawGraph()

const svgGraph = d3.select('body').append('svg').attr('class', 'graph')

// moviesToCircles(Movies);

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

svgGraph.selectAll("circle")
  .data(file)
  .enter()
  .append("circle")
  .attr('cx', f => x(parseInt(f.Title.substring(f.Title.length - 5, f.Title.length-1))))
  .attr('cy', f => y((f['World Sales (in $)'])))
  .attr('r', 5)
  .attr('fill',f => {
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
        return 'indianred';
        break;
      case 'Adventure':
        return 'blue';
        break;
      case 'Animation':
        return 'green';
        break;
      case 'Comedy':
        return 'yellow';
        break;
      case 'Crime':
        return 'orange';
        break;
      case 'Documentary':
        return 'purple';
        break;
      case 'Drama':
        return 'pink';
        break;
      case 'Family':
        return 'brown';
        break;
      case 'Fantasy':
        return 'black';
        break;
      case 'History':
        return 'white';
        break;
      case 'Horror':
        return 'grey';
        break;
      case 'Music':
        return 'gold';
        break;
      case 'Mystery':
        return 'silver';
        break;
      case 'Romance':
        return 'violet';
        break;
    }
  })


// file.map((f, i) => {
//   svgGraph.append('circle')
//     .attr('cx', () => x(parseInt(f.Title.substring(f.Title.length - 5, f.Title.length-1))))
//     .attr('cy', () => y(height-(f['World Sales (in $)'])))
//     .attr('r', 5)
//     .attr('fill','indianred')
// })
  // renderMovies(file);

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
