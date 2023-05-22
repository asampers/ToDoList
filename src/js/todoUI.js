const TodoUI = (() => {
  const createRow = (todo) => {
    const todoList = document.querySelector('.todo-list');
    const row = document.createElement('tr');
    todoList.appendChild(row);
    row.appendChild(fillRow(todo));
  }

  const fillRow = (todo) => {
    const completed = document.createElement('td');
    const checkboxDiv = document.createElement('div');
    const checkbox = document.createElement('input')
    const title = document.createElement('td');
    const dueDate = document.createElement('td');
    const priority = document.createElement('td');
    const expand = document.createElement('td');
    const icon = document.createElement('ion-icon');

    icon.localName = 'chevron-down-outline';
    checkbox.type = "checkbox";
		checkbox.checked = todo.completed;
    checkboxDiv.appendChild(checkbox);

    completed.textContent = checkboxDiv
    title.textContent = todo.title;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;
    expand.textContent = icon;
  }

  return { createRow };

})();

export default TodoUI;