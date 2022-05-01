import * as d3 from 'd3';
import { getGraph } from './graph';
import {getSlider} from './slider';
import { getMovieByTitle, renderMovieDetails, getDistributors, getYears, getInflatedWorldSales } from './loadMovies';
d3.select('body').append('div').attr('id', 'my_dataviz');

getGraph()
getSlider()


window.addEventListener('hashchange', () => {
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

const inflatedArray = getInflatedWorldSales();
console.log(inflatedArray[0]/1000000)
console.log(inflatedArray[inflatedArray.length - 1]/1000000)

