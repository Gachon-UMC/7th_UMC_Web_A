function checkEnter(event) {
    if (event.key === 'Enter') {
        const name = document.getElementById('name').value;
        
        // 입력 값이 비어 있지 않으면 리스트에 추가
        if (name.trim() !== "") {
            const todoList = document.getElementById('todoList');

            // 새로운 li 요소 생성
            const li = document.createElement('li');            
            li.textContent = name; // 입력된 값을 li에 추가

            // '완료' 버튼 추가
            const completeButton = document.createElement('button');
            completeButton.textContent = '완료';
            completeButton.className = 'complete-btn';

            // 버튼 클릭 시 완료된 일로 이동
            completeButton.addEventListener('click', function() {
                completedTask(li);
            });

            // li에 버튼 추가
            li.appendChild(completeButton);

            // 해야 할 일 목록에 추가
            todoList.appendChild(li);
            
            // 입력 후 필드 비우기
            document.getElementById('name').value = '';
        }
    }
}

function completedTask(taskElement) {
    const completedList = document.getElementById('completedList');

    // 완료된 일로 이동시키기
    const li = document.createElement('li');
    li.innerHTML = `${taskElement.innerText.replace('완료', '').replace('삭제', '')} <button class="delete-btn">삭제</button>`;
    
    // 삭제 버튼 클릭 시
    li.querySelector('.delete-btn').addEventListener('click', function() {
        deleteTask(li);
    });

    completedList.appendChild(li);
    taskElement.remove();  // 원래 "해야 할 일" 목록에서 삭제

}

function deleteTask(taskElement) {
    taskElement.remove();  // "해낸 일" 목록에서 삭제
}