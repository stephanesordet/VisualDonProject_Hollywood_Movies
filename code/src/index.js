import * as d3 from 'd3';
import { getGraph } from './graph';
import {getSlider} from './slider';
d3.select('body').append('div').attr('id', 'my_dataviz');

getGraph()
getSlider()



const TitlesArray = []
const IntroductionArray = []
const StudiosArray = []
const ReleaseArray = []
const DomSalesArray = []
const IntSalesArray = []
const WorldSalesArray = []
const GenreArray = []
const RuntimeArray = []