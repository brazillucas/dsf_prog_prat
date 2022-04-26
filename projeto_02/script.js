//Declaração das constantes para o cronômetro
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

//Variável que recebe o id do setInterval
let intervalClock;

//Chama a função setInputDate para configurar o input date
setInputDate("#minhaData");

//Configurando o input date para pegar a data atual ou a data que foi salva

//Função que verifica se já tem alguma data salva
//Recebe como parâmetro o ID do input date
function setInputDate(_id){

    //Recebe o input date
     let _dat = document.querySelector(_id);
    
    //Se houver um "timer" salvo no localStorage chama a função setDataSalva
    if (localStorage.getItem("timer")) {
        setDataSalva(_dat);

        //Se existir uma data salva no localStorage inicia o timer
        //DataFinal recebe o timestamp salvo no localStorage
        dataFinal = localStorage.getItem("timer");
        //Inicia o timer
        intervalId = setInterval(timer, 1000);

    } else {
        //Se não houve, chama a função setDataHoje
        setDataHoje(_dat);
    }
};

//Função que coloca a data salva no input date
function setDataSalva(_dat) {
    //Pega o timestamp salvo no localStorage
    timestamp = localStorage.getItem("timer");
    //Chama a função timeConverter para converter o timestamp em data
    let data = timeConverter(timestamp);
    //Coloca a data convertida no input date
    _dat.value = data;
}

//Função que coloca a data atual no input date
function setDataHoje(_dat) {
    //Pega a data atual, o dia atual, o mês atual e o ano atual
    let hoy = new Date(), d = hoy.getDate(), m = hoy.getMonth() + 1, y = hoy.getFullYear(), data;

    //Verifica se o dia atual é menor que 10 e adiciona um 0 antes do dia
    //Se o dia for menor que 10 adiciona um '0' antes do dia
    (d < 10) ? d = "0" + d : d;

    //Verifica se o mês atual é menor que 10 e adiciona um 0 antes do mês
    //Se o mês for menor que 10 adiciona um '0' antes do mês
    (m < 10) ? m = "0" + m : m;

    //Concatena a data atual
    data = y + "-" + m + "-" + d;
    
    //Coloca a data atual no input date
    _dat.value = data;
}

//Função que converte o timestamp salvo em data
function timeConverter(timestamp){
    //Pega a data salva, o dia salvo, o mês salvo e o ano salvo
    let a = new Date(timestamp * 1);
    let months = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getUTCDate(3);
    let time = year;
    
    //Verifica se o mês salvo é menor que 10 e adiciona um '0' antes do mês
    //Se o mês for menor que 10 adiciona um '0' antes do mês
    (month < 10) ? time = `${time}-0${month}` : time = `${time}-${month}`;
    
    //Verifica se o dia salvo é menor que 10 e adiciona um '0' antes do dia
    //Se o dia for menor que 10 adiciona um '0' antes do dia
    (date < 10) ? time = `${time}-0${date}` : time = `${time}-${date}`;

    //Retorna a data salva
    return time;
}

//Função que gerencia a rotação do relógio
function setRotation(element, rotationRatio) {
    //Gira o ponteiro (element) do relógio segundo o grau (rotationRatio) recebido
    element.style.setProperty('--rotation', rotationRatio * 360);

}

//Função que faz o cronômetro funcionar
function timer () {
    //Pega o timestamp atual
    let dataAtual = new Date().getTime();
    //Calcula a diferença entre o timestamp atual e o timestamp no input date
    total = dataFinal - dataAtual;

    //Salva os dias, horas, minutos e segundos
    let dias = Math.floor(total / dia);
    let horas = Math.floor((total % dia) / hora + 3);
    let minutos = Math.floor((total % hora) / minuto);
    let segundos = Math.floor((total % minuto) / segundo);

    //Verifica se precisa de um '0' antes do dia, hora, minuto ou segundo
    horas < 10 && horas >= 0 ? horas = "0" + horas : horas;
    minutos < 10 && minutos >= 0 ? minutos = "0" + minutos : minutos;
    segundos < 10 && segundos >= 0 ? segundos = "0" + segundos : segundos;
    
    //Verifica se há mais de um dia de espera e corrige o 'faltam' para se encaixar corretamente
    if ((dias == 1)){
        document.querySelector("#cronometro_dias").innerHTML = `Faltam ${dias} dia`;
    } else if (dias > 0) {
        document.querySelector("#cronometro_dias").innerHTML = `Faltam ${dias} dias`;
    } else {
        document.querySelector("#cronometro_dias").innerHTML = `Faltam`;
    }

    //Altera os números do cronômetro
    document.querySelector("#cronometro").innerHTML = `${horas}:${minutos}:${segundos}`;

    //Pega os graus do ângulo dos ponteiros
    const seconds = Math.floor((total % minuto) / segundo) / 60;
    const minutes = Math.floor((total % hora) / minuto) / 60;
    const hours = Math.floor((total % dia) / hora + 2) / 12;
    
    //Chama a função de rotação do cronômetro de acordo com o tempo restante
    setRotation(sec, seconds);
    setRotation(min, minutes);
    setRotation(hour, hours);
    
}

//Função que inicia o cronômetro e salva a data no localStorage
function start () {
    //Pega o valor no input date
    const data = document.querySelector("#minhaData").value;
    //Pega o timestamp da data
    dataFinal = new Date(data).getTime();
    //Inicia o cronômetro cronômetro
    intervalId = setInterval(timer, 1000);
    //Salva o timestamp no localStorage
    localStorage.setItem("timer", dataFinal);
}

//Função que para o cronômetro e zera tudo
function stop() {
    //Para o cronômetro
    clearInterval(intervalId);
    //Zera o cronômetro
    document.querySelector("#cronometro").innerHTML = "00:00:00";
    //Volta o 'faltam tantos dias' para 'faltam'
    document.querySelector("#cronometro_dias").innerHTML = "Faltam";
    //Volta o ângulo dos ponteiros para 0
    setRotation(sec, 0);
    setRotation(min, 0);
    setRotation(hour, 0);
    //remove o timestamp do localStorage
    localStorage.removeItem("timer");
    //Chama a função setInputDate
    setInputDate("#minhaData");
}

// ### PRÓXIMA FUNÇÃO ###
// TRANSFORMAR O CRONÔMETRO EM UM RELÓGIO SE A DATA EM INPUT DATE FOR IGUAL A ATUAL