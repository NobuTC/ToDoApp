// Select all elements in the DOM
const myForm = document.querySelector("#myForm");
const myInput = document.querySelector("#createTodo");
const myList = document.querySelector("#todoList");
const clearAll = document.querySelector("#clearAll");
const selectedBtn = document.querySelector("#clearSelectedBtn");
const warningText = document.querySelector("#warningText");

// Focus on input box, just make it easier to type
myInput.focus();

// TODO is from todo.js
const myTodo = new Todo();
myTodo.getValueFromStorage();
insertToDosToHTML();

function insertToDosToHTML() {
  // Get all the todos from todo Array
  const allTodo = myTodo.getAllTodos();

  // Empty everything inside <ul> to create HTML again
  myList.innerHTML = "";

  // I loop through every single todo
  // first time, array of todo is empty so this won't run []

  allTodo.forEach((todo) => {
    // Insert into the <ul>(#todoList)) this string HTML
    let itemDoneClass = "";
    if (todo.done) {
      itemDoneClass = "item--done";
    }

    myList.insertAdjacentHTML(
      "beforeend",
      `
      <li class="item ${itemDoneClass}" data-key="${todo.id}" onclick="onClickTodo(this)">
           <input type="checkbox" value="${todo.id}" class="item-checkbox" />
           ${todo.text}
      </li>
      `
    );
  });
}

// element is <li class="item" data-key="1231232323"></li>
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

// When form is submitted, then we call onSubmit function
myForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  // It prevent from refreshing (stop reloading)
  event.preventDefault();
  // it will get any value in this input box (kirjoitus laatikko)
  const myTodoText = myInput.value;

  // Check if Text is more than 5
  if (myTodoText.length > 5) {
    // Add new todo
    myTodo.createTodo(myTodoText);
    myForm.reset();
    insertToDosToHTML();
    // hide error message
    warningText.style.display = "none";
    myInput.className = "";
  } else {
    // length is less than 5 or empty
    myInput.className = "input-error";
    // show the error message
    warningText.style.display = "block";
  }
}

// When user clicks on the clear all button
clearAll.addEventListener("click", onClearAll);

function onClearAll() {
  myTodo.clearAll();
  insertToDosToHTML();
}

// when user click on selected item button
selectedBtn.addEventListener("click", onClickSelectedBtn);

function onClickSelectedBtn() {
  const selectedInputs = document.querySelectorAll(".item-checkbox:checked");

  // Don't do anything if there is nothing selected
  if (selectedInputs.length === 0) return;

  for (var i = 0; i <= selectedInputs.length; i++) {
    const element = selectedInputs[i];
    if (element) {
      const myId = element.value; // 1666553383123456 for example
      myTodo.removeTodo(myId);
    }
  }
  insertToDosToHTML();
}
