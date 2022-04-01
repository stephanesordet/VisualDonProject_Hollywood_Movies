import * as d3 from 'd3';
import { getGraph } from './graph';
const API_KEY = '24cd33d154dc43bf62799d9af836baa3'
const API_QUERY = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query="
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
const movieList = document.querySelector('.list')
const movieListItemTemplate = document.getElementById('movieList').cloneNode(true);
d3.select('body').append('div').attr('id', 'my_dataviz');

getGraph()

async function loadJson(url) {
  const response = await fetch(url)
  const parsedJson = await response.json()
  const posterURL = parsedJson.results[0].poster_path;
  return posterURL;
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