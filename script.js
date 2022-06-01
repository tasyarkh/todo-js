window.addEventListener('load', () => {
    const form = document.querySelector("#new-task");
    const input = document.querySelector("#task-input");
    const list = document.querySelector("#tasks");

    const KEY = "todo"

    let storeData = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("isi task mu !");
            return;
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");
       
        task_el.appendChild(task_content_el);

        const task_input = document.createElement("input");
        task_input.classList.add("text");
        task_input.type = "text";
        task_input.value = task;
        task_input.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input);

        const task_action = document.createElement("div");
        task_action.classList.add("action");

        const task_edit = document.createElement("button");
        task_edit.classList.add("edit");
        task_edit.innerHTML = "Edit";

        const task_del = document.createElement("button");
        task_del.classList.add("delete");
        task_del.innerHTML = "Delete";

        task_action.appendChild(task_edit);
        task_action.appendChild(task_del);

        task_el.appendChild(task_action);

        list.appendChild(task_el);

        input.value = "";
        
        task_edit.addEventListener('click', () => {
            if (task_edit.innerText.toLowerCase() == "edit") {
                task_input.removeAttribute("readonly");
                task_input.focus();
                task_edit.innerText = "Save";
            } else {
                task_input.setAttribute("readonly", "readonly");
                task_edit.innerText = "Edit";
            }
            saveData();
        });

        task_del.addEventListener('click', () => {
            list.removeChild(task_el);
            saveData();
        });
        
    });
   
});

function saveData(){
    localStorage.setItem(KEY, JSON.stringify(storeData));
    getData();
}

function getData(){
    storeData = JSON.parse(localStorage.getItem(KEY));
}

getData();