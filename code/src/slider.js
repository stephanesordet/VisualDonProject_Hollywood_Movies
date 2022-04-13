import { getRelease } from "./loadMovies";

const slider = document.getElementById('slider');
const sliderDiv = document.getElementById('my_slider');
const rangeValue = document.getElementById('range-value');

let years = getRelease()
let tabYears = []
years.forEach(year => {
    tabYears.push(year.substr(year.length-4, 4))
})
let uniqueYears = [...new Set(tabYears)]
uniqueYears.sort()
uniqueYears.splice(0 , 3)
uniqueYears.pop()

export function getSlider(){
    slider.setAttribute('min', uniqueYears[1])
    slider.setAttribute('max', uniqueYears[uniqueYears.length - 1])
    slider.addEventListener("change", ()=> {
     rangeValue.innerHTML = slider.value;
    }) 
}



