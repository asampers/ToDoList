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
  TodoUI.removeToDoFromUI(status, e);
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
  editForm.title.value = todo.title;
  editForm.description.value = todo.description;
  editForm.date.value = todo.dueDate;
  editForm.priority.value = todo.priority;
};

const saveEditedToDo = () => {
  let allProjects = getProjects();
  const todoIndex = e.currentTarget.dataset.editId;
  const projectIndex = ProjectUI.getActiveProject().projectIndex;
  const todo = allProjects[projectIndex].items[todoIndex];
  const div = document.querySelector(`#todo-${todo.index}`);
};

const callEditForm = (e) => {
  const todoIndex = e.currentTarget.dataset.editId;
  const activeProject = ProjectUI.getActiveProject().activeProject;
  const todo = activeProject.items[todoIndex];
  const editTaskbtn = document.querySelector(".new-task-btn");
  const editModalTitle = document.querySelector(".modal-title");
  editModalTitle.textContent = "Edit Task";
  fillEditForm(todo);
  editTaskbtn.click();
};

export { createToDo, addToDoToProj, removeToDo, completedToDo, callEditForm };
