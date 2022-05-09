import {
    range
} from "d3";
import {
    getGraph
} from "./graph";
import {
    getRelease,
    getYears
} from "./loadMovies";

const slider = document.getElementById('slider');
const sliderDiv = document.getElementById('my_slider');
const rangeValue = document.getElementById('range-value');
const yearsCheckbox = document.getElementById('AllYears');
const inflationCheckbox = document.getElementById('Inflation');

yearsCheckbox.checked = true;
inflationCheckbox.checked = false;
const uniqueYears = getYears()

inflationCheckbox.addEventListener('input', () => {
    if (inflationCheckbox.checked) {
        if (yearsCheckbox.checked) {
            removeGenre();
            getGraph(false, true);
        } else {
            removeGenre();
            rangeValue.innerHTML = uniqueYears[slider.value]
            getGraph(uniqueYears[slider.value], true);
        }
    } else {
        if (yearsCheckbox.checked) {
            removeGenre();
            getGraph(false, false);
        } else {
            removeGenre();
            rangeValue.innerHTML = uniqueYears[slider.value]
            getGraph(uniqueYears[slider.value], false);
        }
    }
})

yearsCheckbox.addEventListener('input', () => {
    if (yearsCheckbox.checked) {
        if (inflationCheckbox.checked) {
            removeGenre();
            rangeValue.innerHTML = "";
            slider.value = uniqueYears.length-1;
            getGraph(false, true);
        } else {
            removeGenre();
            rangeValue.innerHTML = ""
            slider.value = uniqueYears.length-1;
            getGraph(false, false);
        }
       
    } else {
        if (inflationCheckbox.checked) {
            removeGenre();
            rangeValue.innerHTML = uniqueYears[0]
            slider.value = 0;
            getGraph(uniqueYears[0], true);
        } else {
            removeGenre();
            rangeValue.innerHTML = uniqueYears[0]
            slider.value = 0;
            getGraph(uniqueYears[0], false);
        }
        
    }
})

export function getSlider() {
    slider.setAttribute('min', 0)
    slider.setAttribute('max', uniqueYears.length - 1)
    slider.addEventListener("input", () => {
        rangeValue.innerHTML = uniqueYears[slider.value]
        yearsCheckbox.checked = false;
        if (inflationCheckbox.checked) {
            removeGenre();
            getGraph(uniqueYears[slider.value], true);
        } else {
            removeGenre();
            getGraph(uniqueYears[slider.value]);
        }
    })
}


export function readScroll(deltaY) {
    let checker;
    
    const random = Math.floor(Math.random()*5);
    if (deltaY > 0) {
        if (slider.value > 0) {
            if (random%5 === 0) {
        slider.value--;
        checker = true
            }
        }
    } else {
        if (slider.value < uniqueYears.length - 1) {
            if (random%5 === 0) {
        slider.value++;
        checker = true
            }
        }
    }
    if (checker) {
    document.querySelectorAll('.tooltip').forEach(tooltip => {
        tooltip.style.display = 'none';
    })
    removeGenre()
    rangeValue.innerHTML = uniqueYears[slider.value]
    yearsCheckbox.checked = false;
    getGraph(uniqueYears[slider.value]);
}
} 

document.querySelectorAll('#colorsLegend button').forEach(genre => {
    genre.addEventListener('click', () => {
        if(genre.classList.contains('active')) {
            genre.classList.remove('active');

            if (inflationCheckbox.checked) {
                if (yearsCheckbox.checked) {
                    getGraph(false, true);
                } else {
                    rangeValue.innerHTML = uniqueYears[slider.value]
                    getGraph(uniqueYears[slider.value], true);
                }
            } else {
                if (yearsCheckbox.checked) {
                    getGraph(false, false);
                } else {
                    rangeValue.innerHTML = uniqueYears[slider.value]
                    getGraph(uniqueYears[slider.value], false);
                }
            }
        }
        else {
            document.querySelectorAll('#colorsLegend button').forEach(genre => {
                genre.classList.remove('active');
            })
            genre.classList.add('active');
            if (inflationCheckbox.checked) {
                if (yearsCheckbox.checked) {
                    getGraph(false, true, genre.innerHTML);
                } else {
                    rangeValue.innerHTML = uniqueYears[slider.value]
                    getGraph(uniqueYears[slider.value], true, genre.innerHTML);
                }
            } else {
                if (yearsCheckbox.checked) {
                    getGraph(false, false, genre.innerHTML);
                } else {
                    rangeValue.innerHTML = uniqueYears[slider.value]
                    getGraph(uniqueYears[slider.value], false, genre.innerHTML);
                }
            }
        }
    })
  })

  function removeGenre() {
    document.querySelectorAll('#colorsLegend button').forEach(genre => {
        genre.classList.remove('active');
    })
}