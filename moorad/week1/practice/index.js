const input = document.querySelector("input");
const todo = document.querySelector(".todo");
const finished = document.querySelector(".finished");

const addTodo = (e) => {
    if (e.key !== "Enter") return;

    const td = document.createElement("div");
    td.classList.add("td");

    const span = document.createElement("span");
    span.textContent = e.target.value;

    const button = document.createElement("button");
    button.classList.add("add");
    button.textContent = "추가";

    td.appendChild(span);
    td.appendChild(button);

    button.addEventListener("click", () => addFinished(td));

    todo.appendChild(td);

    // 입력 필드 초기화
    e.target.value = "";
};

const addFinished = (td) => {
    const tdButton = td.querySelector(".add");
    tdButton.remove();

    const newButton = document.createElement("button");
    newButton.classList.add("finished");
    newButton.textContent = "완료";

    td.appendChild(newButton);
    newButton.addEventListener("click", () => td.remove());
    finished.appendChild(td);
};

input.addEventListener("keydown", addTodo);
