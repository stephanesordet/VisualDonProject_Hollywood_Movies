import { range } from "d3";
import { getGraph } from "./graph";
import { getRelease } from "./loadMovies";

const slider = document.getElementById('slider');
const sliderDiv = document.getElementById('my_slider');
const rangeValue = document.getElementById('range-value');
const checkbox = document.getElementById('AllYears');

checkbox.checked = true;
let years = getRelease()
let tabYears = []
years.forEach(year => {
    tabYears.push(year.substr(year.length-4, 4))
})
let uniqueYears = [...new Set(tabYears)]
uniqueYears.sort()
uniqueYears.splice(0 , 3)
uniqueYears.pop()
checkbox.addEventListener('input', ()=>{
    if (checkbox.checked) {
        rangeValue.innerHTML = ""; 
        slider.value = 1977;
        getGraph(false);
    } else {
        rangeValue.innerHTML = "1977"
        getGraph(1977);
    }
})

export function getSlider(){
    slider.setAttribute('min', uniqueYears[1])
    slider.setAttribute('max', uniqueYears[uniqueYears.length - 1])
    slider.addEventListener("input", ()=> {
        rangeValue.innerHTML = slider.value;
        checkbox.checked = false;
        getGraph(slider.value);         
    }) 
}



