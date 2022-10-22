function generateRandomNumber() {
  const timeNow = new Date().getTime();
  return timeNow + Math.floor(Math.random() * 1000000);
}

class Todo {
  todoArray = [];

  constructor() {}

  createTodo(myText) {
    const myid = generateRandomNumber();
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
      .map((x) => {
        return x.id;
      })
      .indexOf(parseInt(myId));

    // if found
    if (index >= 0) {
      // Remove that found todo
      this.todoArray.splice(index, 1);
      this.saveToLocalStorage();
    }
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
    // Empty todo array
    this.todoArray.length = 0;
    this.saveToLocalStorage();
  }
}
