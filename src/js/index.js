// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { ProjectFactory } from './project'
import { ToDoFactory } from './todo'
console.log('This was set up properly.')
let toDo = ToDoFactory('title', 'desc', 'due', 'low')
let project = ProjectFactory('This is a project', 'This is its desc')
console.log (toDo)
console.log(project)