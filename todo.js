function generateRandomNumber() {
  // Get current unix timestamp , like 1666553383
  const timeNow = new Date().getTime();
  // 1666553383 + a random number from 0-1 000 000 (for example 123456)
  // 1666553383123456
  return timeNow + Math.floor(Math.random() * 1000000);
}

// This todo class will handle everything related to todo
// such as save to local storage, get from localstorage
// toggle todo by todo's id, remove todo by todo's id
// clear all todo

class Todo {
  // This array will contain all the todos
  todoArray = [];

  constructor() {}

  createTodo(myText) {
    const myid = generateRandomNumber();

    // A todo will have id, text and done
    const newTodo = { id: myid, text: myText, done: false };
    this.todoArray.push(newTodo);
    this.saveToLocalStorage();
  }

  toggleDone(myId) {
    // find the todo from todoArray by Id
    const todo = this.todoArray.find((todo) => {
      // because id is string
      // so we need to convert string to integer by parseInt()
      return todo.id === parseInt(myId);
    });

    // if we found it
    if (todo) {
      // change false -> true, if true -> false
      todo.done = !todo.done;
    }
    this.saveToLocalStorage();
  }

  removeTodo(myId) {
    // Find the position of todo in todo array that match myId
    var index = this.todoArray
      .map((todo) => {
        return todo.id;
      }) // [123, 444, 444,4555]
      .indexOf(parseInt(myId)); // If position of 444 is found, then return 1

    // if found
    if (index >= 0) {
      // Remove that found todo
      this.todoArray.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  getValueFromStorage() {
    // Get data from localstorage, it is a string value
    const data = localStorage.getItem("myTodo");
    // JSON.parse(data) will convert string to an array
    this.todoArray = JSON.parse(data) || [];
  }

  saveToLocalStorage() {
    // convert array of todo into a string
    const stringData = JSON.stringify(this.todoArray || []);
    // store to local storage
    localStorage.setItem("myTodo", stringData);
  }

  getAllTodos() {
    return this.todoArray;
  }

  clearAll() {
    // Empty todo array
    this.todoArray.length = 0;
    this.saveToLocalStorage();
  }
}
