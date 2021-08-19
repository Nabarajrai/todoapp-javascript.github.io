const todos = JSON.parse(localStorage.getItem("todos")) || [];
const todosElement = document.querySelector("ul");
const input = document.querySelector("#input");
const search = document.querySelector("#search");
const form = document.querySelector("form");
const button = document.querySelector("button");

function searchTodo() {
  render();
  const inputSearch = search.value;
  let html = "";
  const searchTdo = todos.filter((todo, i) => {
    if (inputSearch == todo.title) {
      html =
        html +
        `<li>
      ${
        todo.completed
          ? `<input type='checkbox' checked onclick='handleChange(${i})' />`
          : `<input type='checkbox' onclick='handleChange(${i})' />`
      }
      <span class=${todo.completed ? "line-strike" : ""}>${todo.title}</span>
      <button onclick="removeTodo(${i})">X</button>
    </li>`;
    }
  });
  todosElement.innerHTML = html;
  console.log(searchTdo);
}
function removeDisabled() {
  input.value === "" ? (button.disabled = true) : (button.disabled = false);
}
function removeTodo(index) {
  todos.splice(index, 1);
  render();
  localStorage.setItem("todos", JSON.stringify(todos));
}

function handleChange(index) {
  const prevState = todos[index].completed;
  todos[index].completed = !prevState;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  removeDisabled();
  let html = "";
  todos.forEach((todo, i) => {
    html =
      html +
      `<li class='lists'>
        ${
          todo.completed
            ? `<input type='checkbox' checked onclick='handleChange(${i})' />`
            : `<input type='checkbox' onclick='handleChange(${i})' />`
        }
        <span class=${todo.completed ? "line-strike" : ""}>${todo.title}</span>
        <button onclick="removeTodo(${i})">X</button>
      </li>`;
  });

  todosElement.innerHTML = html;
}

render();

function addTodo(event) {
  event.preventDefault();

  const newTodo = input.value;

  newTodo == "" ? (button.disabled = true) : "";
  todos.push({ title: newTodo, completed: false });
  render();
  input.value = "";

  localStorage.setItem("todos", JSON.stringify(todos));
}

form.addEventListener("submit", addTodo);
input.addEventListener("keyup", removeDisabled);
search.addEventListener("keyup", searchTodo);
input.addEventListener("focusin", render);
