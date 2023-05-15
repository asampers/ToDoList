let count = localStorage.getItem('count')

function increaseCount() {
  localStorage.setItem('count', ++count)
  return count
}

const ToDoFactory = (title, description, dueDate, priority, completed=false, index=increaseCount() ) => {
  return { index, title, description, dueDate, priority, completed };
}

const createToDo = (event) => {
  let formValue = event.target.elements;
	
  const title = formValue.title.value;
	const desc = formValue.description.value;
	const dueDate = formValue.date.value;
  const priority = formValue.priority.value;

  return ToDoFactory(title, desc, dueDate, priority);
}

export { createToDo };