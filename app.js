function generateRandomNumber() {
  const timeNow = new Date().getTime();
  return timeNow + Math.floor(Math.random() * 1000000);
}

class Todo {
  todoArray = [];

  constructor() {}

  createTodo(text) {
    const id = generateRandomNumber();
    this.todoArray.push({ id, text, done: false });
    this.saveToLocalStorage();
  }

  toggleDone(id) {
    // find the todo from todoArray by Id
    const todo = this.todoArray.find((todo) => {
      // because id is string
      // so we need to convert string to integer by parseInt()
      return todo.id === parseInt(id);
    });

    // if we found it
    if (todo) {
      // change false -> true, if true -> false
      todo.done = !todo.done;
    }
    this.saveToLocalStorage();
  }

  removeTodo(id) {
    var index = this.todoArray
      .map((x) => {
        return x.id;
      })
      .indexOf(parseInt(id));

    this.todoArray.splice(index, 1);

    this.saveToLocalStorage();
  }

  getValueFromStorage() {
    this.todoArray = JSON.parse(localStorage.getItem("myTodo")) || [];
  }

  saveToLocalStorage() {
    localStorage.setItem("myTodo", JSON.stringify(this.todoArray || []));
  }

  getAllTodos() {
    return this.todoArray;
  }

  clearAll() {
    this.todoArray.length = 0;
    this.saveToLocalStorage();
  }
}

const myTodo = new Todo();
myTodo.getValueFromStorage();

const myForm = document.querySelector("#myForm");
const myInput = document.querySelector("#createTodo");
const myList = document.querySelector("#todoList");
const clearAll = document.querySelector("#clearAll");
const selectedBtn = document.querySelector("#clearSelectedBtn");
const warningText = document.querySelector("#warningText");

myInput.focus();

function onClickTodo(element) {
  // get the item ID
  const todoID = element.getAttribute("data-key");

  // if the item is crossed
  if (element.className.indexOf("item--done") >= 0) {
    // remove the cross
    element.className = "item";
  } else {
    // add the cross
    element.className = "item item--done";
  }

  myTodo.toggleDone(todoID);
}

function insertToDosToHTML() {
  // Get all the todos from todo Array
  const allTodo = myTodo.getAllTodos();

  // Empty everything inside <ul> to create HTML again
  myList.innerHTML = "";

  allTodo.forEach((todo) => {
    // Insert into the <ul>(#todoList)) this string HTML
    myList.insertAdjacentHTML(
      "beforeend",
      `
      <li class="item ${todo.done ? "item--done" : ""}" data-key="${
        todo.id
      }" onclick="onClickTodo(this)">
           <input type="checkbox" value="${todo.id}" class="item-checkbox" />
           ${todo.text}
      </li>
      `
    );
  });
}

function onSubmit(event) {
  event.preventDefault();
  const myTodoText = myInput.value;

  // Check if Text is not empty
  if (myTodoText.length > 5) {
    // Add new todo
    myTodo.createTodo(myTodoText);
    myForm.reset();
    insertToDosToHTML();
    warningText.style.display = "none";
  } else {
    // length is empty
    myInput.className = "input-error";
    warningText.style.display = "block";
  }
}

function onClearAll() {
  myTodo.clearAll();
  insertToDosToHTML();
}

function onClickSelectedBtn() {
  const selectedInputs = document.querySelectorAll(".item-checkbox:checked");

  // Don't do anything if there is nothing selected
  if (selectedInputs.length === 0) return;

  for (var i = 0; i <= selectedInputs.length; i++) {
    const element = selectedInputs[i];
    if (element) {
      myTodo.removeTodo(element.value);
    }
  }
  insertToDosToHTML();
}

// When form is submitted, then we call onSubmit function
myForm.addEventListener("submit", onSubmit);

// When user clicks on the clear all button
clearAll.addEventListener("click", onClearAll);

// when user click on selected item button
selectedBtn.addEventListener("click", onClickSelectedBtn);

insertToDosToHTML();
