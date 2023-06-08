const TodoUI = (() => {
  const createRow = (todo) => {
    const todoList = document.querySelector(".todo-list");
    const row = document.createElement("div");
    const hiddenRow = document.createElement("div");

    row.classList.add(
      "d-flex",
      "justify-content-between",
      "mb-3",
      "border",
      "rounded",
      "p-2"
    );
    row.id = `accordion${todo.index}`;
    hiddenRow.classList.add("accordion-collapse", "collapse");
    hiddenRow.setAttribute("data-bs-parent", `#accordion${todo.index}`);
    hiddenRow.id = `collapse${todo.index}`;
    fillRow(todo, row, hiddenRow);
    todoList.appendChild(row);
    todoList.appendChild(hiddenRow);
  };

  const fillRow = (todo, row, hiddenRow) => {
    const checkbox = document.createElement("input");
    const title = document.createElement("span");
    const dueDate = document.createElement("span");
    const priority = document.createElement("span");
    const expand = document.createElement("span");
    const hiddenField = document.createElement("span");
    //const moreInfo = document.createElement('div');

    expand.innerHTML = "<ion-icon name='chevron-down-outline'></ion-icon>";
    hiddenField.classList.add("accordion-body");
    hiddenField.setAttribute("colspan", "5");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    title.textContent = todo.title;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;
    hiddenField.textContent = `Description: ${todo.description}`;

    row.appendChild(checkbox);
    row.appendChild(title);
    row.appendChild(dueDate);
    row.appendChild(priority);
    row.appendChild(expand);
    hiddenRow.appendChild(hiddenField);
  };

  return { createRow };
})();

export default TodoUI;
