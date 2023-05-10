let counter = 0

const ToDoFactory = (title, description, dueDate, priority, completed=false, index=counter++ ) => {
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