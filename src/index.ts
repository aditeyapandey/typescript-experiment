import "core-js/stable";
import "regenerator-runtime/runtime";
import $ = require("jquery");
import { Barchart } from './chart';


function sum(x:number, y:number):number {
    return x + y;
}

window.onload = () =>{
    console.log("welcome");
    $( ".input" ).append( `<p>${sum(2,5)}</p>`);
    let barchart1 = new Barchart(460, 460, "input")
    barchart1.createChart();
}