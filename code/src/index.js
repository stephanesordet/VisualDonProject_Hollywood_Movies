import * as d3 from 'd3';
import { getGraph } from './graph';
import {getSlider} from './slider';
import { getMovieByTitle, renderMovieDetails, getDistributors } from './loadMovies';
d3.select('body').append('div').attr('id', 'my_dataviz');

getGraph(false)
getSlider()


window.addEventListener('hashchange', () => {
    console.log(42);
    // const movieTitle = window.location.hash.substr(1)
    // renderMovieDetails(getMovieByTitle(movieTitle))
    // renderMovieDetails(movie)
})


const TitlesArray = []
const IntroductionArray = []
const StudiosArray = []
const ReleaseArray = []
const DomSalesArray = []
const IntSalesArray = []
const WorldSalesArray = []
const GenreArray = []
const RuntimeArray = []

console.log(getDistributors())