import {
  tickFormat
} from 'd3'
import * as d3 from 'd3';


const TitlesArray = []
const IntroductionArray = []
const StudiosArray = []
const ReleaseArray = []
const DomSalesArray = []
const IntSalesArray = []
const WorldSalesArray = []
const GenreArray = []
const RuntimeArray = []

function getMovies() {
  const Movies = require('../assets/movies.json')
  return Movies
}

// export function moviesToCircles(movies) {
//   //use d3 and create 1 circle per movie colored by genre where y is Worldwide and x is Release Date
//   d3.select('svg')
//     .data(movies)
//     .enter()
//     .append('circle')
//     .attr('cx', function (d) {
//       return x(d.Release / 10)
//     })
//     .attr('cy', function (d) {
//       return y(d.Worldwide / 100000000)
//     })
//     .attr('r', function (d) {
//       return 20;
//     })
//     .attr('fill', function (d) {
      // switch (d.Genre[0]) {
      //   case 'Action':
      //     return 'indianred';
      //     break;
      //   case 'Adventure':
      //     return 'blue';
      //     break;
      //   case 'Animation':
      //     return 'green';
      //     break;
      //   case 'Comedy':
      //     return 'yellow';
      //     break;
      //   case 'Crime':
      //     return 'orange';
      //     break;
      //   case 'Documentary':
      //     return 'purple';
      //     break;
      //   case 'Drama':
      //     return 'pink';
      //     break;
      //   case 'Family':
      //     return 'brown';
      //     break;
      //   case 'Fantasy':
      //     return 'black';
      //     break;
      //   case 'History':
      //     return 'white';
      //     break;
      //   case 'Horror':
      //     return 'grey';
      //     break;
      //   case 'Music':
      //     return 'gold';
      //     break;
      //   case 'Mystery':
      //     return 'silver';
      //     break;
      //   case 'Romance':
      //     return 'indigo';
      //     break;
      //   case 'Sci-Fi':
      //     return 'navy';
      //     break;
      //   case 'Thriller':
      //     return 'maroon';
      //     break;
      //   case 'War':
      //     return 'olive';
      //     break;
      //   case 'Western':
      //     return 'lime';
      //     break;
      //   default:
      //     return 'black';
      // }
//     })
// }

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
