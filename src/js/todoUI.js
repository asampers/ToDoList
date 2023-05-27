const TodoUI = (() => {
  const createRow = (todo) => {
    const todoList = document.querySelector('.todo-list');
    const row = document.createElement('tr');
    const hiddenRow = document.createElement('tr');

    row.classList.add('accordion', 'accordion-flush', 'collapsed');
    row.id = `accordion${todo.index}`;
    row.type = 'button'
    row.setAttribute('data-bs-toggle', 'collapse');
    row.setAttribute('data-bs-target', `#collapse${todo.index}`);
    row.setAttribute('aria-controls', `collapse${todo.index}`)
    hiddenRow.classList.add('.hide-table-padding', 'accordion-collapse', 'collapse');
    hiddenRow.setAttribute('data-bs-parent', `#accordion${todo.index}`);
    hiddenRow.id = `collapse${todo.index}`;
    fillRow(todo, row, hiddenRow);
    todoList.appendChild(row);
    todoList.appendChild(hiddenRow);
  }

  const fillRow = (todo, row, hiddenRow) => {
    const completed = document.createElement('td');
    const checkboxDiv = document.createElement('div');
    const checkbox = document.createElement('input')
    const title = document.createElement('td');
    const dueDate = document.createElement('td');
    const priority = document.createElement('td');
    const expand = document.createElement('td');
    const hiddenField = document.createElement('td');
    //const moreInfo = document.createElement('div');

    expand.classList.add('expand-button');
    hiddenField.classList.add('accordion-body');
    hiddenField.setAttribute('colspan', '5');
    checkbox.type = "checkbox";
		checkbox.checked = todo.completed;
    checkboxDiv.appendChild(checkbox);

    completed.appendChild(checkboxDiv) 
    title.textContent = todo.title;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;
    hiddenField.textContent = `Description: ${todo.description}`;

    row.appendChild(completed);
    row.appendChild(title);
    row.appendChild(dueDate);
    row.appendChild(priority);
    row.appendChild(expand);
    hiddenRow.appendChild(hiddenField);
  }

  return { createRow };

})();

export default TodoUI;