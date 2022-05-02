// Declaração das variáveis do relógio
const hour = document.querySelector('[data-hour-hand]');
const min = document.querySelector('[data-minute-hand]');
const sec = document.querySelector('[data-second-hand]');


//Função que gerencia a rotação do relógio
function setRotation(element, rotationRatio) {
    //Gira o ponteiro (element) do relógio segundo o grau (rotationRatio) recebido
    element.style.setProperty('--rotation', rotationRatio * 360);

}

//Função que faz o relógio funcionar
function timer () {
    //Pega o timestamp atual
    let dataAtual = new Date()

    //Salva os dias, horas, minutos e segundos
    let horas = dataAtual.getHours();
    let minutos = dataAtual.getMinutes(2);
    let segundos = dataAtual.getSeconds(2);

    //Verifica se precisa de um '0' antes do dia, hora, minuto ou segundo
    horas < 10 && horas >= 0 ? horas = "0" + horas : horas;
    minutos < 10 && minutos >= 0 ? minutos = "0" + minutos : minutos;
    segundos < 10 && segundos >= 0 ? segundos = "0" + segundos : segundos;

    //Altera os números do cronômetro
    document.querySelector("#cronometro").innerHTML = `${horas}:${minutos}:${segundos}`;

    //Pega os graus do ângulo dos ponteiros
    const seconds =  segundos/ 60;
    const minutes = minutos / 60;
    const hours = horas / 12;
    
    //Chama a função de rotação do cronômetro de acordo com o tempo restante
    setRotation(sec, seconds);
    setRotation(min, minutes);
    setRotation(hour, hours);
    
}

//Função que inicia o cronômetro e salva a data no localStorage
function start () {
    //Inicia o cronômetro cronômetro
    setInterval(timer, 1000);
}

start();
