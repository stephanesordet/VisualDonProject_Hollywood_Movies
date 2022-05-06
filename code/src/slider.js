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
            getGraph(false, true);
        } else {
            console.log(42)
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
})

yearsCheckbox.addEventListener('input', () => {
    if (yearsCheckbox.checked) {
        if (inflationCheckbox.checked) {
            console.log(42);
            rangeValue.innerHTML = "";
            slider.value = uniqueYears.length-1;
            getGraph(false, true);
        } else {
            rangeValue.innerHTML = ""
            slider.value = uniqueYears.length-1;
            getGraph(false, false);
        }
    } else {
        if (inflationCheckbox.checked) {
            rangeValue.innerHTML = uniqueYears[0]
            slider.value = 0;
            getGraph(uniqueYears[0], true);
        } else {
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
            getGraph(uniqueYears[slider.value], true);
        } else {
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
    rangeValue.innerHTML = uniqueYears[slider.value]
    yearsCheckbox.checked = false;
    getGraph(uniqueYears[slider.value]);
}
} 