const ToDoFactory = (title, description, dueDate, priority, completed=false) => {
  let index = 0;
  
  const setIndex = () => {
    index++;
  }
  
  return { setIndex, title, description, dueDate, priority, completed };
}

export { ToDoFactory };