document.getElementById('btn').addEventListener('click', function () {
    adicionarTarefa();
});

const limiteDeCaracteres = 30;

document.getElementById('input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

function criarElementoTarefa(texto, concluida) {
    const elem = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.innerText = texto;
    
    if (concluida) {
        taskText.style.textDecoration = "line-through";
    }

    elem.appendChild(taskText);

    const contentContainer = document.createElement('div');
    contentContainer.style.display = 'flex';
    contentContainer.style.justifyContent = 'space-between';
    contentContainer.style.alignItems = 'center';

    const buttonContainer = document.createElement('div');

    const btn1 = document.createElement('button');
    btn1.setAttribute('title', 'Mark as completed');
    btn1.innerText = "Done";
    btn1.style.border = "none";
    btn1.style.borderRadius = "3px";
    btn1.style.backgroundColor = "#b4b3d8";
    btn1.style.padding = "3px";
    btn1.style.margin = '5px';
    btn1.style.cursor = 'pointer';
    btn1.addEventListener('click', function () {
        taskText.style.textDecoration = "line-through";
        salvarTarefas();
    });

    const btn2 = document.createElement('button');
    btn2.setAttribute('title', 'Delete task');
    btn2.innerText = "Delete";
    btn2.style.border = "none";
    btn2.style.borderRadius = "3px";
    btn2.style.backgroundColor = "#b4b3d8";
    btn2.style.padding = "3px";
    btn2.style.cursor = 'pointer';
    btn2.addEventListener('click', function () {
        elem.remove();
        salvarTarefas();
    });

    buttonContainer.appendChild(btn1);
    buttonContainer.appendChild(btn2);
    
    contentContainer.appendChild(taskText);
    contentContainer.appendChild(buttonContainer);

    elem.appendChild(contentContainer);

    return elem;
}

function adicionarTarefa() {
    let input = document.getElementById('input').value;
    if (input === "") {
        alert("Please enter something");
    } else if (input.length > limiteDeCaracteres) {
        alert("Input is too long. Please enter a shorter task.");
    } else {
        const elem = criarElementoTarefa(input, false);

        const ul = document.querySelector('ul');
        ul.appendChild(elem);

        document.getElementById('input').value = "";

        salvarTarefas();
    }
}

function salvarTarefas() {
    const tarefas = [];
    const listaTarefas = document.querySelectorAll('ul > li');

    listaTarefas.forEach((item) => {
        const texto = item.querySelector('span').innerText;
        const concluida = item.querySelector('span').style.textDecoration === "line-through";
        tarefas.push({ texto, concluida });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefasSalvas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        const tarefas = JSON.parse(tarefasSalvas);

        tarefas.forEach((tarefa) => {
            const elem = criarElementoTarefa(tarefa.texto, tarefa.concluida);
            const ul = document.querySelector('ul');
            ul.appendChild(elem);
        });
    }
}

carregarTarefasSalvas();
