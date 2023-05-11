// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createProject } from './project'
import { createToDo } from './todo'

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
  console.log(project);
  newProject.reset();
  document.querySelector('.new-project-btn').click();
})