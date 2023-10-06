document.getElementById('btn').addEventListener('click', function () {
    adicionarTarefa();
});

document.getElementById('input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit' };
    return date.toLocaleDateString(undefined, options);
}

function criarElementoTarefa(texto, data, concluida) {
    const elem = document.createElement('li');
    const dateSpan = document.createElement('span');
    dateSpan.innerText = data;

    const taskText = document.createElement('span');
    taskText.innerText = " - " + texto;
    if (concluida) {
        elem.style.textDecoration = "line-through";
    }

    elem.appendChild(dateSpan);
    elem.appendChild(taskText);

    const btn1 = document.createElement('button');
    btn1.innerText = "Done";
    btn1.style.border = "none";
    btn1.style.marginLeft = "3%";
    btn1.style.marginBottom = "8px";
    btn1.style.borderRadius = "3px";
    btn1.style.backgroundColor = "#b4b3d8";
    btn1.style.padding = "2px";
    btn1.addEventListener('click', function () {
        elem.style.textDecoration = "line-through";
        salvarTarefas();
    });

    const btn2 = document.createElement('button');
    btn2.innerText = "Delete";
    btn2.style.border = "none";
    btn2.style.marginLeft = "3%";
    btn2.style.marginBottom = "8px";
    btn2.style.borderRadius = "3px";
    btn2.style.backgroundColor = "#b4b3d8";
    btn2.style.padding = "2px";
    btn2.addEventListener('click', function () {
        elem.remove();
        salvarTarefas();
    });

    elem.appendChild(btn1);
    elem.appendChild(btn2);

    return elem;
}

function adicionarTarefa() {
    let input = document.getElementById('input').value;
    if (input === "") {
        alert("Please enter something");
    } else {
        const currentDate = new Date();
        const date = formatDate(currentDate);
        const elem = criarElementoTarefa(input, date, false);

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
        const data = item.querySelector('span:first-child').innerText;
        const texto = item.querySelector('span:nth-child(2)').innerText.slice(3);
        const concluida = item.style.textDecoration === "line-through";

        tarefas.push({ data, texto, concluida });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefasSalvas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        const tarefas = JSON.parse(tarefasSalvas);

        tarefas.forEach((tarefa) => {
            const elem = criarElementoTarefa(tarefa.texto, tarefa.data, tarefa.concluida);
            const ul = document.querySelector('ul');
            ul.appendChild(elem);
        });
    }
}

carregarTarefasSalvas();
