import * as d3 from 'd3';
import file from '../assets/movies.json'
import {
  renderMovieDetails,
  getDistributorsForYear,
  getMoviesForYear
} from './loadMovies.js'

const studioImages = {
  '20th Century Studios': '/assets/img/studios/20thCenturyStudios.png',
  'Artisan Entertainment': '/assets/img/studios/ArtisanEntertainment.png',
  'Columbia Pictures': '/assets/img/studios/ColumbiaPictures.png',
  'Dimension Films': '/assets/img/studios/DimensionFilms.png',
  'DreamWorks': '/assets/img/studios/DreamWorks.png',
  'FilmDistrict': '/assets/img/studios/FilmDistrict.png',
  'Focus Features': '/assets/img/studios/FocusFeatures.png',
  'Fox Searchlight Pictures': '/assets/img/studios/FoxSearchlightPictures.png',
  'IFC Films': '/assets/img/studios/IFCFilms.png',
  'Lionsgate': '/assets/img/studios/Lionsgate.png',
  'Metro-Goldwin-Mayer (MGM)': '/assets/img/studios/Metro-Goldwin-Mayer(MGM).png',
  'Miramax': '/assets/img/studios/Miramax.png',
  'NewLine Cinema': '/assets/img/studios/NewLineCinema.png',
  'Newmarket Films': '/assets/img/studios/NewmarketFilms.png',
  'Orion Pictures': '/assets/img/studios/OrionPictures.png',
  'Paramount Pictures': '/assets/img/studios/ParamountPictures.png',
  'Relativity Media': '/assets/img/studios/RelativityMedia.png',
  'Revolution Studios': '/assets/img/studios/RevolutionStudios.png',
  'Roadside Attractions': '/assets/img/studios/RoadsideAttractions.png',
  'Screen Gems': '/assets/img/studios/ScreenGems.png',
  'Sony Pictures Entertainment (SPE)': '/assets/img/studios/SonyPicturesEntertainment(SPE).png',
  'STX Entertainment': '/assets/img/studios/STXEntertainment.png',
  'Summit Entertainment': '/assets/img/studios/SummitEntertainment.png',
  'The Weinstein Company': '/assets/img/studios/TheWeinsteinCompany.png',
  'TriStar Pictures': '/assets/img/studios/TriStarPictures.png',
  'United Artists': '/assets/img/studios/UnitedArtists.png',
  'Universal Pictures': '/assets/img/studios/UniversalPictures.png',
  'Walt Disney Studios Motion Pictures': '/assets/img/studios/WaltDisneyStudiosMotionPictures.png',
  'Warner Bros': '/assets/img/studios/WarnerBros.png'
}
const inflationDictionary = {
  '1970': 6.21,
  '1972': 5.75,
  '1973': 5.42,
  '1975': 4.48,
  '1977': 3.98,
  '1978': 3.7,
  '1979': 3.32,
  '1980': 2.92,
  '1981': 2.65,
  '1982': 2.5,
  '1983': 2.42,
  '1984': 2.32,
  '1985': 2.24,
  '1986': 2.2,
  '1987': 2.12,
  '1988': 2.04,
  '1989': 1.94,
  '1990': 1.84,
  '1991': 1.77,
  '1992': 1.72,
  '1993': 1.67,
  '1994': 1.63,
  '1995': 1.58,
  '1996': 1.54,
  '1997': 1.5,
  '1998': 1.48,
  '1999': 1.45,
  '2000': 1.4,
  '2001': 1.36,
  '2002': 1.34,
  '2003': 1.31,
  '2004': 1.28,
  '2005': 1.23,
  '2006': 1.2,
  '2007': 1.16,
  '2008': 1.12,
  '2009': 1.12,
  '2010': 1.1,
  '2011': 1.07,
  '2012': 1.05,
  '2013': 1.03,
  '2014': 1.02,
  '2015': 1.02,
  '2016': 1,
  '2017': 1,
  '2018': 1,
  '2019': 1,
  '2020': 1,
  '2021': 1,
  '2022': 1
}

export async function getGraph(year = false, inflation = false) {
  document.querySelector('.graph').replaceChildren();

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
    let y;
    if (inflation) {
      y = d3.scalePow()
        .exponent(0.3)
        .domain([70, 3600])
        .range([height, 0 + 10])
    } else {
      y = d3.scalePow()
        .exponent(0.3)
        .domain([60, 3000])
        .range([height, 0 + 10])
    }

  svgGraph.append('g')
    .call(d3.axisRight(y).ticks(20));

  if (year == false) {
    const x = d3.scaleLinear()
      .domain([1970, 2021])
      .range([10, width])

    svgGraph.append('g')
      .attr("transform", "translate(5," + height + ")")
      .call(d3.axisTop(x).ticks(44).tickSize(10)).selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.6em")
      .attr("dy", "2.4em")
      .attr("transform", "rotate(-65)");
    if (inflation == false) {
      svgGraph.append('g')
        .attr("transform", "translate(5,0)")
        .attr('class', 'all-movies')
        .selectAll("circle")
        .data(file)
        .enter()
        .append("circle")
        .attr('cx', -200)
        .attr('cy', f => y((f['World Sales (in $)']) / 1000000))
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
        .attr('data-year', f => f.Title.substring(f.Title.length - 5, f.Title.length - 1))
        .on("mouseover", function (event, d) {
          div.transition()
            .duration(200)
            .style("opacity", .9);
          div.html((d.Title) + "<br/>" + "Cliquez pour plus d'informations")
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        })
        .on("click", function (event, d) {
          renderMovieDetails(event, d);
        })
        .transition()
      .delay(function (d, i) {
        if (i < 3) {
          return i*25;
        } else if(i < 6) {
          return i*20;
        } else if(i < 10) {
          return i*15;
        } else if(i < 15) {
          return i*10;
        } else if(i < 20) {
          return i*5;
        } else {
          return i*2;
        }
      })
      .attr('cx', f => x(parseInt(f.Title.substring(f.Title.length - 5, f.Title.length - 1))));
    } else {
      svgGraph.append('g')
        .attr("transform", "translate(5,0)")
        .attr('class', 'all-movies')
        .selectAll("circle")
        .data(file)
        .enter()
        .append("circle")
        .attr('cx', -200)
        .attr('cy', (f) => {
          const amount = f['World Sales (in $)'];
          const year = f.Title.substring(f.Title.length - 5, f.Title.length - 1);
          const adjustedAmount = Math.floor(amount * inflationDictionary[year]);
          return y(adjustedAmount/1000000);})
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
        .attr('data-year', f => f.Title.substring(f.Title.length - 5, f.Title.length - 1))
        .on("mouseover", function (event, d) {
          div.transition()
            .duration(200)
            .style("opacity", .9);
          div.html((d.Title) + "<br/>" + "Cliquez pour plus d'informations")
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        })
        .on("click", function (event, d) {
          renderMovieDetails(event, d);
        })
        .transition()
      .delay(function (d, i) {
        if (i < 3) {
          return i*25;
        } else if(i < 6) {
          return i*20;
        } else if(i < 10) {
          return i*15;
        } else if(i < 15) {
          return i*10;
        } else if(i < 20) {
          return i*5;
        } else {
          return i*2;
        }
      })
      .attr('cx', f => x(parseInt(f.Title.substring(f.Title.length - 5, f.Title.length - 1))));
    }

  } else {
    const movies = getMoviesForYear(year);
    const yearsDistributors = getDistributorsForYear(year);
    let x;
    if (yearsDistributors.length == 1) {
      x = d3.scaleLinear()
        .domain([0, 1])
        .range([10, width])
    }else {
      x = d3.scaleLinear()
        .domain([0, yearsDistributors.length - 1])
        .range([10, width])
    }
    svgGraph.append('g')
      .attr("transform", "translate(5," + height + ")")
      .call(d3.axisTop(x).ticks(yearsDistributors.length - 1).tickSize(10)).selectAll("text")
    
    if (inflation) {
      svgGraph.append('g')
      .attr("transform", "translate(5,0)")
      .attr('class', 'all-movies')
      .selectAll("circle")
      .data(movies)
      .enter()
      .append("circle")
      .attr('cx', -200)
      .attr('cy', (f) => {
        const amount = f['World Sales (in $)'];
        const year = f.Title.substring(f.Title.length - 5, f.Title.length - 1);
        const adjustedAmount = Math.floor(amount * inflationDictionary[year]);
        return y(adjustedAmount/1000000);})
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
      .attr('data-year', f => f.Title.substring(f.Title.length - 5, f.Title.length - 1))
      .on("mouseover", function (event, d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html((d.Title) + "<br/>" + "Cliquez pour plus d'informations")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      })
      .on("click", function (event, d) {
        renderMovieDetails(event, d);
      })
      .transition()
      .delay(function (d, i) {
        if (i < 3) {
          return i*100;
        } else if(i < 6) {
          return i*80;
        } else if(i < 10) {
          return i*60;
        } else if(i < 15) {
          return i*40;
        } else if(i < 20) {
          return i*20;
        } else {
          return i*10;
        }
      })
      .attr('cx', f => x(yearsDistributors.indexOf(f['Distributor'])));
    } else {
      svgGraph.append('g')
      .attr("transform", "translate(5,0)")
      .attr('class', 'all-movies')
      .selectAll("circle")
      .data(movies)
      .enter()
      .append("circle")
      .attr('cx', -200)
      .attr('cy', f => y((f['World Sales (in $)']) / 1000000))
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
      .attr('data-year', f => f.Title.substring(f.Title.length - 5, f.Title.length - 1))
      .on("mouseover", function (event, d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html((d.Title) + "<br/>" + "Cliquez pour plus d'informations")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      })
      .on("click", function (event, d) {
        renderMovieDetails(event, d);
      })
      .transition()
      .delay(function (d, i) {
        if (i < 3) {
          return i*100;
        } else if(i < 6) {
          return i*80;
        } else if(i < 10) {
          return i*60;
        } else if(i < 15) {
          return i*40;
        } else if(i < 20) {
          return i*20;
        } else {
          return i*10;
        }
      })
      .attr('cx', f => x(yearsDistributors.indexOf(f['Distributor'])));
    }

  }

}