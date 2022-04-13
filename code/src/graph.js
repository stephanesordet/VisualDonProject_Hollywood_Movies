import * as d3 from 'd3';
import file from '../assets/movies.json'
import {renderMovieDetails} from './loadMovies.js'

export function getGraph(){
const svgGraph = d3.select('.graph').append('svg').attr('class', 'graph')

let div = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")

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
  .exponent(0.3)
  .domain([70, 2847])
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
  .attr('cy', f => y((f['World Sales (in $)'])/1000000))
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
        case 'Biography':
      case 'History':
        return '#49ABA4';
        break;
      case 'Horror':
        return '#06373A';
        break;
        case 'Music':
      case 'Musical':
        return '#066EC7';
        break;
      case 'Mystery':
        return '#A43600';
        break;
      case 'Romance':
        return '#0A5070';
        break;
      case 'Sci-Fi':
        return '#061A23';
        break;
        case 'Sport':
            return '#C71810';
            break;
        case 'Thriller':
        return '#5282AB';
        break;
        case 'War':
        return '#1F5232';
        break;
        case 'Western':
        return '#85407A';
        break;

    }
  })
  .on("mouseover", function(event,d) {
    div.transition()
      .duration(200)
      .style("opacity", .9);
    div.html((d.Title) + "<br/>" + "Cliquez pour plus d'informations")
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 28) + "px");
    })
  .on("mouseout", function(d) {
    div.transition()
      .duration(500)
      .style("opacity", 0);
    })
  .on("click", function(event,d){
    renderMovieDetails(event, d);
  });

}