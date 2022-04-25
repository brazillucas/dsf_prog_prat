const segundo = 1000;
const minuto = segundo * 60;
const hora = minuto * 60;
const dia = hora * 24;
const semana = dia * 7;

// Declaração das variáveis do timer
let total;
let dataFinal;
let intervalId;

// Declaração das variáveis do relógio
const hour = document.querySelector('[data-hour-hand]');
const min = document.querySelector('[data-minute-hand]');
const sec = document.querySelector('[data-second-hand]');
let intervalClock;


if (localStorage.getItem("timer")) {
    dataFinal = localStorage.getItem("timer");
    intervalId = setInterval(timer, 1000);
}

function start () {
    const data = document.querySelector("input").value;
    dataFinal = new Date(data).getTime();
    
    intervalId = setInterval(timer, 1000);

    localStorage.setItem("timer", dataFinal);
}

function timer () {
    let dataAtual = new Date().getTime();
    total = dataFinal - dataAtual;

    let dias = Math.floor(total / dia);
    let horas = Math.floor((total % dia) / hora + 3);
    let minutos = Math.floor((total % hora) / minuto);
    let segundos = Math.floor((total % minuto) / segundo);


    horas < 10 && horas >= 0 ? horas = "0" + horas : horas;
    minutos < 10 && minutos >= 0 ? minutos = "0" + minutos : minutos;
    segundos < 10 && segundos >= 0 ? segundos = "0" + segundos : segundos;
    

    if ((dias == 1)){
        document.querySelector("#cronometro_dias").innerHTML = `Faltam ${dias} dia`;
    } else if (dias > 0) {
        document.querySelector("#cronometro_dias").innerHTML = `Faltam ${dias} dias`;
    } else {
        document.querySelector("#cronometro_dias").innerHTML = `Faltam`;
    }

    document.querySelector("#cronometro").innerHTML = `${horas}:${minutos}:${segundos}`;

    const currentDate = new Date();
    const seconds = Math.floor((total % minuto) / segundo) / 60;
    const minutes = Math.floor((total % hora) / minuto) / 60;
    const hours = Math.floor((total % dia) / hora + 2) / 12;
    
    setRotation(sec, seconds);
    setRotation(min, minutes);
    setRotation(hour, hours);
    
}

//intervalClock = setInterval(setDate, 1000);
/* 
function setDate(){
    const currentDate = new Date();
    const seconds = currentDate.getSeconds() / 60;
    const minutes = (seconds + currentDate.getMinutes()) / 60;
    const hours = (minutes + currentDate.getHours()) / 12;
    setRotation(sec, seconds);
    setRotation(min, minutes);
    setRotation(hour, hours);
} */

function setRotation(element, rotationRatio) {
    console.log("teste");
    element.style.setProperty('--rotation', rotationRatio * 360);

}

function stop() {
    document.querySelector("#cronometro").innerHTML = "00:00:00";
    document.querySelector("#cronometro_dias").innerHTML = "Faltam";
    clearInterval(intervalId);
    localStorage.removeItem("timer");
}



