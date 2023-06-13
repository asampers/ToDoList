import { getProjects } from ".";
import { ProjectUI } from "./projectUI";
import { TodoUI } from "./todoUI";

let count = localStorage.getItem("count");

function increaseCount() {
  localStorage.setItem("count", ++count);
  return count;
}

const ToDoFactory = (
  title,
  description,
  dueDate,
  priority,
  completed = false,
  index = increaseCount()
) => {
  return { index, title, description, dueDate, priority, completed };
};

const createToDo = (event) => {
  let formValue = event.target.elements;

  const title = formValue.title.value;
  const desc = formValue.description.value;
  const dueDate = formValue.date.value;
  const priority = formValue.priority.value;

  return ToDoFactory(title, desc, dueDate, priority);
};

const addToDoToProj = (todo) => {
  let allProjects = getProjects();
  const index = ProjectUI.getActiveProject().projectIndex;
  allProjects[index].items[todo.index] = todo;
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
};

const removeToDo = (e) => {
  let answer = confirm("Are you sure you want to delete this task?");
  if (!answer) {
    return;
  }

  let allProjects = getProjects();
  const todoIndex = e.currentTarget.dataset.id;
  const projectIndex = ProjectUI.getActiveProject().projectIndex;
  delete allProjects[projectIndex].items[todoIndex];
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
  document
    .querySelector(".todo-list")
    .removeChild(e.currentTarget.parentNode.parentNode.parentNode);
};

const completedToDo = (e) => {
  let allProjects = getProjects();
  const todoIndex = e.target.dataset.todo;
  const projectIndex = ProjectUI.getActiveProject().projectIndex;
  const todo = allProjects[projectIndex].items[todoIndex];
  todo.completed = e.target.checked;
  lineThrough(todo.completed, e.target.parentNode.parentNode);
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
  let status = todo.completed ? ".todo-list" : ".completed-list";
  document
    .querySelector(`${status}`)
    .removeChild(e.target.parentNode.parentNode.parentNode);
  TodoUI.addTodoToUI(todo);
};

const lineThrough = (completed, div) => {
  if (completed) {
    div.style.textDecoration = "line-through";
    div.classList.add("text-secondary");
  } else {
    div.style.textDecoration = "none";
    div.classList.remove("text-secondary");
  }
};

export { createToDo, addToDoToProj, removeToDo, completedToDo };
