function helloWorld(nome) {
    let mensagem = nome.firstElementChild.innerText;
    let numero = prompt("Para quem você quer enviar a mensagem?");
    link = `https://api.whatsapp.com/send?phone=55${numero}&text=${mensagem}`;
    window.open(link);
}