// let idTarefa = [0, 1, 2, 3];

function addCard(elemento) {
    console.log(elemento.previousElementSibling.id);

    const ulId = elemento.previousElementSibling.id;
    let texto = prompt("Qual é a nova tarefa?");
    
    if (!texto) {
        alert("Não é possível adicionar uma tarefa vazia!");
        return;
    }

    const board = document.getElementById(ulId);

    console.log(board);
    
    /* const idCard = gerarId();
    idTarefa.push(idCard); */

    const template = `
    <li id="${new Date().getTime()}" draggable="true" ondragstart="drag(event)">
        <p>${texto}</p>
        <p class="remove" onclick="removeCard(this)">x</p>
    </li>
    `;

    console.log(template);

    board.innerHTML = board.innerHTML + template;

}

function removeCard(elemento) {
    document.getElementById(elemento.parentElement.id).remove();
    for (id in idTarefa) {
        if (idTarefa[id] == elemento.parentElement.id) {
            idTarefa.splice(id, 1);
            return;
        }
    }
}

/* function gerarId() {
    let id = Math.floor(Math.random() * (new Date().getTime()));
    for (let i = 0; i < idTarefa.length; i++) {
        if (id == idTarefa[i]) {
            id = Math.floor(Math.random() * 100);
            i = 0;
        }
    }
    return id;
} */


function drag(event) {
    event.dataTransfer.setData("card", event.target.id);
}

function over(event) {
    event.preventDefault();
}

function drop(event, id) {
    event.preventDefault();
    console.log(event.dataTransfer.getData("card") + "olha, due certo");
    const target = document.getElementById(id);
    const data = event.dataTransfer.getData("card");
    const card = document.getElementById(data);
    target.appendChild(card);
}