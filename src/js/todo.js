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
  index,
  completed = false
) => {
  return { title, description, dueDate, priority, index, completed };
};

const createToDo = (event) => {
  let formValue = event.target.elements;

  const title = formValue.title.value;
  const desc = formValue.description.value;
  const dueDate = formValue.date.value;
  const priority = formValue.priority.value;
  let index;
  formValue.taskID.value
    ? (index = formValue.taskID.value)
    : (index = increaseCount());
  return ToDoFactory(title, desc, dueDate, priority, index);
};

const addToDoToProj = (todo) => {
  let allProjects = getProjects();
  const index = ProjectUI.getActiveProject().projectIndex;
  allProjects[index].items[todo.index] = todo;
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
};

const determineStatus = (source, todo) => {
  if (source == "delete") {
    return todo.completed ? ".completed-list" : ".todo-list";
  } else {
    return todo.completed ? ".todo-list" : ".completed-list";
  }
};

const removeToDo = (e) => {
  let answer = confirm("Are you sure you want to delete this task?");
  if (!answer) {
    return;
  }

  let allProjects = getProjects();
  const todoIndex = e.currentTarget.dataset.id;
  const projectIndex = ProjectUI.getActiveProject().projectIndex;
  const todo = allProjects[projectIndex].items[todoIndex];
  const div = document.querySelector(`#todo-${todo.index}`);
  let status = determineStatus("delete", todo);
  TodoUI.removeToDoFromUI(status, div);
  delete allProjects[projectIndex].items[todoIndex];
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
};

const completedToDo = (e) => {
  let allProjects = getProjects();
  const todoIndex = e.target.dataset.todo;
  const projectIndex = ProjectUI.getActiveProject().projectIndex;
  const todo = allProjects[projectIndex].items[todoIndex];
  const div = document.querySelector(`#todo-${todo.index}`);
  todo.completed = e.target.checked;
  lineThrough(todo.completed, div);
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
  let status = determineStatus("complete", todo);
  TodoUI.removeToDoFromUI(status, div);
  TodoUI.addTodoToUI(todo);
  ProjectUI.renderShowHideLink();
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

const fillEditForm = (todo) => {
  const editForm = document.querySelector(".new-edit-form");
  editForm.taskID.value = todo.index;
  editForm.title.value = todo.title;
  editForm.description.value = todo.description;
  editForm.date.value = todo.dueDate;
  editForm.priority.value = todo.priority;
};

const callEditForm = (e) => {
  let allProjects = getProjects();
  const todoIndex = e.currentTarget.dataset.editId;
  const projectIndex = ProjectUI.getActiveProject().projectIndex;
  const todo = allProjects[projectIndex].items[todoIndex];
  fillEditForm(todo);
};

export { createToDo, addToDoToProj, removeToDo, completedToDo, callEditForm };
