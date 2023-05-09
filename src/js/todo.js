const ToDoFactory = (title, description, dueDate, priority, completed=false) => {
  return { title, description, dueDate, priority, completed };
}

export { ToDoFactory };