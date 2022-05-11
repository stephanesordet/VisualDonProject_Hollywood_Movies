import * as d3 from 'd3';
import { getGraph } from './graph';
import {getSlider, readScroll} from './slider';
import { getMovieByTitle, renderMovieDetails, getDistributors, getYears, getInflatedWorldSales } from './loadMovies';
d3.select('body').append('div').attr('id', 'my_dataviz');

getGraph()
getSlider()
toggleModal('welcome')


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

window.addEventListener('wheel', (e) => {
    const detailsOff = document.getElementById('movieDetails').classList.contains('hidden')
    const welcomeOff = document.querySelector('.welcome-modal').classList.contains('hidden')
    if (detailsOff && welcomeOff) {
    readScroll(e.deltaY);
    }
});

document.getElementById('references-btn').addEventListener('click', () => {
    toggleModal('references')
})

document.querySelector('.close-modal').addEventListener('click', () => {
    toggleModal('welcome')
})

document.querySelector('.close-references').addEventListener('click', () => {
    toggleModal('references')
})

function toggleModal(modalName) {
    if (modalName == 'welcome') {
        document.querySelector('.welcome-modal').classList.toggle('hidden');
    } else {
        document.querySelector('.references-modal').classList.toggle('hidden');
    }
}