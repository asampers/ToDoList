// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createProject, addProject } from './project'
import { createToDo } from './todo'
import defaultProject from './defaultProject'
import defaultCount from './defaultCount'
import { ProjectUI } from './projectUI'

const getProjects = () => {
	return JSON.parse(localStorage.getItem("allProjects") || "[]");
}

const newTask = document.querySelector(".new-task")
newTask.addEventListener('submit', (event) => {
  event.preventDefault();
  let task = createToDo(event);
  console.log(task);
  newTask.reset();
  document.querySelector('.new-task-btn').click();
})

const newProject = document.querySelector(".new-project")
newProject.addEventListener('submit', (event) => {
  event.preventDefault();
  let project = createProject(event);
  addProject(project);
  ProjectUI.addNewProjectToUI(project);
  newProject.reset();
  document.querySelector('.new-project-btn').click();
})


const init = () => {
  ProjectUI.addAllProjectsToUI();
}
window.onload = defaultCount();
window.onload = defaultProject();
init();
export { getProjects };