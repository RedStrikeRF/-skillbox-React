(function () {
  let todoItems = [];
  let localKey;
  function createAppTitle(title) {
      const appTitle = document.createElement('h2');
      appTitle.innerHTML = title;
      return appTitle;
  }

  function createTodoItem(name, done = false) {
      const item = document.createElement('li');
      const buttonGroup = document.createElement('div');
      const doneButton = document.createElement('button');
      const deleteButton = document.createElement('button');

      item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      item.textContent = name;

      buttonGroup.classList.add('btn-group', 'btn-group-sm');
      doneButton.classList.add('btn', 'btn-success');
      doneButton.textContent = 'Готово';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.textContent = 'Удалить';

      buttonGroup.append(doneButton);
      buttonGroup.append(deleteButton);
      item.append(buttonGroup);
      const data = {
        id: findNeededId(),
        name,
        done
      };

      if (done) item.classList.add('list-group-item-success');
      
      doneButton.addEventListener('click', () => {
        item.classList.toggle('list-group-item-success');
        data.done = item.classList.contains('list-group-item-success');
        saveLocal();
      });

      deleteButton.addEventListener('click', () => {
          if(confirm('Вы уверены?')) {
              item.remove();
              todoItems.splice(todoItems.indexOf(data),1);
              saveLocal();
          }
      });

      todoItems.push(data);
      return {
          item,
          doneButton,
          deleteButton
      };
  }

  function findNeededId() {
    const ids = todoItems.map(obj => obj.id);
    for (let i = 0; i <= Math.max(...ids); i++) {
      if (!ids.includes(i)) {
        return i;
      }
    }
    return todoItems.length;
  }

  function createTodoItemForm() {
      const form = document.createElement('form');
      const input = document.createElement('input');
      const buttonWrapper = document.createElement('div');
      const button = document.createElement('button');

      form.classList.add('input-group', 'mb-3');
      input.classList.add('form-control');
      input.placeholder = 'Введите название нового дела';
      buttonWrapper.classList.add('input-group-append');
      button.classList.add('btn', 'btn-primary');
      button.textContent = 'Добавить дело';
      button.disabled = true;

      buttonWrapper.append(button);
      form.append(input);
      form.append(buttonWrapper);

      return {
          form,
          input,
          button
      };
  }
  
  function saveLocal() {
    localStorage.setItem(localKey, JSON.stringify(todoItems));
  }

  function createTodoList() {
      const list = document.createElement('ul');
      list.classList.add('list-group');
      return list;
  }
  
  function createTodoApp(container, title = "Список дел") {

      const todoAppTitle = createAppTitle(title);
      const todoItemForm = createTodoItemForm();
      const todoList = createTodoList();
      const storageToggleButton = createStorageToggleButton();
      localKey = title;

      container.append(todoAppTitle);
      container.append(todoItemForm.form);
      container.append(todoList);
      container.append(storageToggleButton);

      todoItemForm.input.addEventListener('input', () => {
          todoItemForm.button.disabled = !todoItemForm.input.value;
      });

      if (localStorage.getItem(localKey)) {
        JSON.parse(localStorage.getItem(localKey)).forEach(el => {
          let todoItem = createTodoItem(el.name, el.done);
          todoList.append(todoItem.item);
        });
      }

      todoItemForm.form.addEventListener('submit', (e) => {
          e.preventDefault();

          if(!todoItemForm.input.value) {
              return;
          }
          
          const todoItem = createTodoItem(todoItemForm.input.value);

          todoList.append(todoItem.item);
          saveLocal();
          todoItemForm.input.value = '';
          todoItemForm.button.disabled = true;
          //
      })
  }

  function createStorageToggleButton() {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'mb-3');
    button.textContent = 'Перейти на серверное хранилище';

    button.addEventListener('click', () => {
        if (localKey === "local") {
            localKey = "server";
            button.textContent = 'Перейти на локальное хранилище';
        } else {
            localKey = "local";
            button.textContent = 'Перейти на серверное хранилище';
        }
        reloadApp();
    });

    return button;
  }

  async function saveServer() {
    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoItems)
        });
        if (!response.ok) {
            throw new Error('Failed to save data on server.');
        }
    } catch (error) {
        console.error(error);
    }
  }

  async function loadServer() {
      try {
          const response = await fetch('/api/todos');
          if (!response.ok) {
              throw new Error('Failed to load data from server.');
          }
          const data = await response.json();
          todoItems = data;
      } catch (error) {
          console.error(error);
      }
  }

  async function reloadApp() {
    const container = document.getElementById('todo-app');
    container.innerHTML = ''; // Очистим контейнер перед перезагрузкой

    // Загружаем данные в зависимости от выбранного хранилища
    if (localKey === 'local') {
        if (localStorage.getItem('todoItems')) {
            todoItems = JSON.parse(localStorage.getItem('todoItems'));
        }
    } else if (localKey === 'server') {
        await loadServer();
    }

    createTodoApp(container);
  }

  window.createTodoApp = createTodoApp;
})();