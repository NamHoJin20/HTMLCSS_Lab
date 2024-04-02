// 아이템 리스트 배열
let itemList = [];

// HTML 요소 가져오기
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const dueDateInput = document.getElementById('due-date-input');
const todoList = document.getElementById('todo-list');

// 폼 제출 이벤트 리스너 추가
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const todoText = input.value.trim();
    const dueDateString = dueDateInput.value.trim();
    if (todoText !== '' && dueDateString !== '') {
        // 입력된 마감 날짜를 YYYY-MM-DD 형식에서 Date 객체로 변환
        const parts = dueDateString.split('-');
        const dueDate = new Date(parts[0], parts[1] - 1, parts[2]);
        // 현재 날짜와 비교하여 유효한 날짜인지 확인
        if (isValidDate(dueDate)) {
            // 아이템 객체 생성
            const newItem = {
                text: todoText,
                dueDate: dueDate
            };
            // 아이템 리스트에 추가
            itemList.push(newItem);
            // 아이템 표시
            displayItem(newItem);
            // 입력 필드 초기화
            input.value = '';
            dueDateInput.value = '';
        } else {
            alert('유효한 날짜를 입력하세요.');
        }
    } else {
        alert('할 일과 마감 날짜를 입력하세요.');
    }
});

// 아이템 표시 함수
function displayItem(item) {
    const li = document.createElement('li');
    li.innerText = item.text + ' (Due: ' + item.dueDate.toLocaleDateString() + ')';
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        if (li.classList.contains('completed')) {
            // 완료된 아이템 제거
            setTimeout(function() {
                todoList.removeChild(li);
                // itemList에서도 제거
                itemList = itemList.filter(function(element) {
                    return element.text !== item.text || element.dueDate.getTime() !== item.dueDate.getTime();
                });
            }, 500); // 0.5초 후에 제거되도록 설정
        }
    });
    todoList.appendChild(li);
}

// 유효한 날짜인지 확인하는 함수
function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}
