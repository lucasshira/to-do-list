document.getElementById('btn').addEventListener('click', function(){
        addTask();
});

document.getElementById('input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit' };
    return date.toLocaleDateString(undefined, options);
};

function addTask() {
    let input = document.getElementById('input').value;
    if(input === ""){
        alert("Please enter something");
    } else {

    const dateSpan = document.createElement('span');
    const currentDate = new Date();
    dateSpan.innerText = formatDate(currentDate);

    let elem = document.createElement('li');
    let btn1 = document.createElement('button');
    let btn2 = document.createElement('button');

    btn1.innerText = "Done";
    btn2.innerText = "Delete";

    let ul = document.querySelector('ul');
    ul.appendChild(elem);

    elem.appendChild(dateSpan);

    let taskText = document.createElement('span');
    taskText.innerText = " - " + input;
    elem.appendChild(taskText);

    elem.appendChild(btn1);
    elem.appendChild(btn2);

    btn1.style.border = "none";
    btn1.style.marginLeft = "3%";
    btn1.style.marginBottom = "8px";
    btn1.style.borderRadius = "3px";
    btn1.style.backgroundColor = "#b4b3d8";
    btn1.style.padding = "2px";

    btn2.style.border = "none";
    btn2.style.marginLeft = "3%";
    btn2.style.marginBottom = "8px";
    btn2.style.borderRadius = "3px";
    btn2.style.backgroundColor = "#b4b3d8";
    btn2.style.padding = "2px";

    btn1.addEventListener('click', function() {
        elem.style.textDecoration = "line-through";
    });

    btn2.addEventListener('click', function() {
        elem.remove();
    });

    document.getElementById('input').value="";
    }
};
