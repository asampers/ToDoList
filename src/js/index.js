// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import { createProject, addProject } from "./project";
import { createToDo, addToDoToProj } from "./todo";
import defaultProject from "./defaultProject";
import defaultCount from "./defaultCount";
import { ProjectUI } from "./projectUI";
import { TodoUI } from "./todoUI";

const getProjects = () => {
  return JSON.parse(localStorage.getItem("allProjects") || "[]");
};

const newEditForm = document.querySelector(".new-edit-form");
const closeBtn = document.querySelector(".close-btn");
const newProject = document.querySelector(".new-project");

const clearForm = (e) => {
  newEditForm.reset();
};

closeBtn.addEventListener("click", clearForm);

newEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let task = createToDo(event);
  addToDoToProj(task);
  TodoUI.addTodoToUI(task);
  newEditForm.reset();
  document.querySelector(".new-task-btn").click();
});

newProject.addEventListener("submit", (event) => {
  event.preventDefault();
  let project = createProject(event);
  addProject(project);
  ProjectUI.addNewProjectToUI(project);
  newProject.reset();
  document.querySelector(".new-project-btn").click();
});

const init = () => {
  ProjectUI.addAllProjectsToUI();
  let sidebar = document.querySelector(".sidebar");
  let firstProject = sidebar.firstElementChild;

  //goes to the first project page on document load
  if (firstProject) {
    firstProject.firstElementChild.click();
  }
};
window.onload = defaultCount();
window.onload = defaultProject();
init();
export { getProjects };
