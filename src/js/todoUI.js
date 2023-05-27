const TodoUI = (() => {
  const createRow = (todo) => {
    const todoList = document.querySelector('.todo-list');
    const row = document.createElement('tr');
    fillRow(todo, row);
    todoList.appendChild(row);
  }

  const fillRow = (todo, row) => {
    const completed = document.createElement('td');
    const checkboxDiv = document.createElement('div');
    const checkbox = document.createElement('input')
    const title = document.createElement('td');
    const dueDate = document.createElement('td');
    const priority = document.createElement('td');
    const expand = document.createElement('td');
    const icon = document.createElement('button');

    icon.innerHTML = '<ion-icon name="chevron-down-outline"></ion-icon>';
    checkbox.type = "checkbox";
		checkbox.checked = todo.completed;
    checkboxDiv.appendChild(checkbox);

    completed.appendChild(checkboxDiv) 
    title.textContent = todo.title;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;
    expand.appendChild(icon);

    row.appendChild(completed);
    row.appendChild(title);
    row.appendChild(dueDate);
    row.appendChild(priority);
    row.appendChild(expand);
  }

  return { createRow };

})();

export default TodoUI;