// 키보드 Enter 눌렀을 때 리스트 추가 함수 실행
document.getElementById("todo-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodoList();
  }
});

// 리스트 추가 함수
function addTodoList() {
  const input = document.getElementById("todo-input");
  const todoContainer = document.querySelector("#todo");

  if (input.value.trim() !== "") {
    const newTodoList = document.createElement("div");
    newTodoList.classList.add("todo-container"); // CSS 적용할 수 있도록 class 추가

    const newTodoText = document.createElement("div");
    newTodoText.textContent = input.value;
    newTodoText.classList.add("todo-container-text");

    const newTodoButton = document.createElement("button");
    newTodoButton.textContent = "완료";
    newTodoButton.classList.add("todo-container-button");

    todoContainer.appendChild(newTodoList);
    newTodoList.appendChild(newTodoText);
    newTodoList.appendChild(newTodoButton);

    //input의 placeholder가 다시 나타나도록
    input.value = "";

    // 완료 버튼 이벤트 추가
    newTodoButton.addEventListener("click", () => {
      const doneList = document.querySelector("#done");
      doneList.appendChild(newTodoList); // 해야 할 일에서 해낸 일로 이동

      newTodoButton.textContent = "삭제"; // 완료에서 삭제 버튼으로 변경

      // 삭제 버튼 이벤트 추가
      newTodoButton.addEventListener("click", (event) => {
        newTodoList.remove();
      });
    });
  }
}
