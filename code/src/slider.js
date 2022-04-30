import { range } from "d3";
import { getGraph } from "./graph";
import { getRelease, getYears } from "./loadMovies";

const slider = document.getElementById('slider');
const sliderDiv = document.getElementById('my_slider');
const rangeValue = document.getElementById('range-value');
const checkbox = document.getElementById('AllYears');

checkbox.checked = true;
// let years = getRelease()
// let tabYears = []
// years.forEach(year => {
//     tabYears.push(year.substr(year.length-4, 4))
// })
// let uniqueYears = [...new Set(tabYears)]
// uniqueYears.sort()
// uniqueYears.splice(0 , 3)
// uniqueYears.pop()
const uniqueYears = getYears()
checkbox.addEventListener('input', ()=>{
    if (checkbox.checked) {
        rangeValue.innerHTML = ""; 
        slider.value = 0;
        getGraph(false);
    } else {
        rangeValue.innerHTML = uniqueYears[0]
        getGraph(uniqueYears[0]);
    }
})

export function getSlider(){
    slider.setAttribute('min', 0)
    slider.setAttribute('max', uniqueYears.length-1)
    slider.addEventListener("input", ()=> {
        rangeValue.innerHTML = uniqueYears[slider.value]
        checkbox.checked = false;
        getGraph(uniqueYears[slider.value]);         
    }) 
}



