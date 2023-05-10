// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { ProjectFactory } from './project'
import { createToDo } from './todo'

const newTask = document.querySelector("#new-task")
newTask.addEventListener('submit', (event) => {
  event.preventDefault();
  let task = createToDo(event);
  console.log(task);
  newTask.reset();
  document.querySelector('.new-task-btn').click();
})