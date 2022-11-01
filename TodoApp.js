// MODEL SECTION

let todos;

const savedTodos = JSON.parse(localStorage.getItem('todos'));

if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [{
    title: "Get groceries",
    dueDate: "2022-10-04",
    id: "id1"
  },
  {
    title: "Wash car",
    dueDate: "2022-02-03",
    id: "id2"
  },
  {
    title: "Make dinner",
    dueDate: "2022-04-03",
    id: "id3"
  }];
}

// Creates a todo
function createTodo(title, dueDate){
  const id = '' + new Date().getTime();
  todos.push({title:title, dueDate: dueDate, id: id});

  saveTodos();
}

// Deletes a todo
function removeTodo(idToDelete){
  todos = todos.filter(function(todo){
    if (todo.id === idToDelete){
      return false;
    }
    else{
      return true;
    }
  });
  saveTodos();

}
function saveTodos(){
  localStorage.setItem('todos', JSON.stringify(todos));
}
render();

function toggleTodo(todoId, checked) {
    todos.forEach(function (todo) {
      if (todo.id === todoId) {
        todo.isDone = checked;
      }
    });
}


// CONTROLLER SECTION
function addTodo() {
  const textbox = document.getElementById("todo-title");
  const title = textbox.value;
  const datePicker = document.getElementById("datePicker");
  const dueDate = datePicker.value;
  
  createTodo(title, dueDate);
  render();
}

function deleteTodo(event){
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;

  removeTodo(idToDelete);
  render();
}
function checkTodo(event) {
    const checkbox = event.target;

    const todoId = checkbox.dataset.todoId;
    const checked = checkbox.checked;

    toggleTodo(todoId, checked);
    render();
  }

// VIEW SECTION
function render(){
  // reset our list
  document.getElementById('todo-list').innerHTML = '';
  
  todos.forEach(function (todo){
    const element = document.createElement("div");
    element.innerText = todo.title + " " + todo.dueDate;
    element.classList = "divElement";
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = checkTodo;
    checkbox.dataset.todoId = todo.id;
    if (todo.isDone === true) {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }
    element.prepend(checkbox);

    const deleteButton = document.createElement("button");
    deleteButton.classList = "deleteButton";
    deleteButton.innerText = "Delete";
    deleteButton.style = "margin-left: 12px;";
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    let todoList = document.getElementById("todo-list");
    todoList.appendChild(element);
  });
}