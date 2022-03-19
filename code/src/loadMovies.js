import { tickFormat } from 'd3'


const TitlesArray = []
const IntroductionArray = []
const StudiosArray = []
const ReleaseArray = []
const DomSalesArray = []
const IntSalesArray = []
const WorldSalesArray = []
const GenreArray = []
const RuntimeArray = []

function getMovies(){
  const Movies = require('../assets/movies.json')
  return Movies
}

export function getTitles(){
  const Movies = getMovies()
  Movies.map((Movies,i) =>{
    TitlesArray.push(Movies.Title)
  
  })
  return TitlesArray
}

export function getSummary(){
  const Movies = getMovies()
  Movies.map((Movies,i) =>{
    IntroductionArray.push(Movies['Movie Info'])
    
  })
  return IntroductionArray
}

export function getStudio(){
  const Movies = getMovies()
  Movies.map((Movies,i) =>{
    StudiosArray.push(Movies.Distributor)
    
  })
  return StudiosArray
}

export function getRelease(){
  const Movies = getMovies()
  Movies.map((Movies,i) =>{
    ReleaseArray.push(Movies['Release Date'])
    
  })
  return ReleaseArray
}

export function getDomSales(){
  const Movies = getMovies()
  Movies.map((Movies,i) =>{
    DomSalesArray.push(Movies['Domestic Sales (in $)'])
    
  })
  return DomSalesArray
}

export function getIntSales(){
  const Movies = getMovies()
  Movies.map((Movies,i) =>{
    IntSalesArray.push(Movies['International Sales (in $)'])
    
  })
  return IntSalesArray
}

export function getWorldSales(){
  const Movies = getMovies()
  Movies.map((Movies,i) =>{
    WorldSalesArray.push(Movies['World Sales (in $)'])
    
  })
  return WorldSalesArray
}

export function getGenre(){
  const Movies = getMovies()
  Movies.map((Movies,i) =>{
    GenreArray.push(Movies.Genre)
    
  })
  return GenreArray
}

export function getRunTime(){
  const Movies = getMovies()
  Movies.map((Movies,i) =>{
    RuntimeArray.push(Movies['Movie Runtime'])
    
  })
  return RuntimeArray
}



