import { switchStorage, getCurrentStorage, saveData, loadData } from './storageSwitcher.js';
import localStorageStorage from './localStorageStorage.js';

const todos = loadData();

const renderTodoList = () => {
    const todoListContainer = document.getElementById('todoList');
    todoListContainer.innerHTML = '';

    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.className = 'list-group-item';
        todoItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${todo.title}</span>
                <div>
                    <input type="checkbox" class="form-check-input" id="checkTodo-${index}" ${todo.completed ? 'checked' : ''}>
                    <label class="form-check-label" for="checkTodo-${index}">Выполнено</label>
                    <button type="button" class="btn btn-danger ml-2" data-index="${index}">Удалить</button>
                </div>
            </div>
        `;
        todoListContainer.appendChild(todoItem);

        // Обработчик изменения состояния задачи
        const checkbox = todoItem.querySelector(`#checkTodo-${index}`);
        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked;
            saveData(todos);
        });

        // Обработчик удаления задачи
        const deleteBtn = todoItem.querySelector('button');
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveData(todos);
            renderTodoList();
        });
    });
};

const addTodoForm = document.createElement('form');
addTodoForm.className = 'mt-3';
addTodoForm.innerHTML = `
    <div class="form-group">
        <input type="text" class="form-control" id="todoTitleInput" placeholder="Введите задачу">
    </div>
    <button type="submit" class="btn btn-primary">Добавить задачу</button>
`;

addTodoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const todoTitleInput = document.getElementById('todoTitleInput');
    const title = todoTitleInput.value.trim();
    if (title) {
        todos.push({ title, completed: false });
        saveData(todos);
        todoTitleInput.value = '';
        renderTodoList();
    }
});

const switchStorageBtn = document.createElement('button');
switchStorageBtn.className = 'btn btn-secondary mb-3';
switchStorageBtn.textContent = getCurrentStorage() === localStorageStorage ? 'Перейти на серверное хранилище' : 'Перейти на локальное хранилище';
switchStorageBtn.addEventListener('click', () => {
    switchStorage();
    switchStorageBtn.textContent = getCurrentStorage() === localStorageStorage ? 'Перейти на серверное хранилище' : 'Перейти на локальное хранилище';
    // Перезагрузка приложения
    location.reload();
});

const appContainer = document.getElementById('app');
appContainer.appendChild(addTodoForm);
appContainer.appendChild(switchStorageBtn);

const todoListContainer = document.createElement('ul');
todoListContainer.id = 'todoList';
todoListContainer.className = 'list-group mt-3';
appContainer.appendChild(todoListContainer);

renderTodoList();
