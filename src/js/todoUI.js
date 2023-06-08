const TodoUI = (() => {
  const createRow = (todo) => {
    const todoList = document.querySelector(".todo-list");
    const row = document.createElement("div");

    row.classList.add("mb-3", "border", "rounded", "p-2");

    fillRow(todo, row);
    todoList.appendChild(row);
  };

  const fillRow = (todo, row) => {
    const checkbox = document.createElement("input");
    const title = document.createElement("span");
    const dueDate = document.createElement("span");
    const priority = document.createElement("span");
    const expand = document.createElement("button");
    const viewField = document.createElement("div");
    const hiddenField = document.createElement("div");
    //const moreInfo = document.createElement('div');

    expand.innerHTML = "<ion-icon name='chevron-down-outline'></ion-icon>";
    expand.classList.add("btn", "btn-sm", "btn-outline-info");
    expand.setAttribute("data-bs-target", `#todo-${todo.index}`);
    expand.setAttribute("data-bs-toggle", "collapse");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    viewField.classList.add("d-flex", "justify-content-between");
    hiddenField.id = `todo-${todo.index}`;
    hiddenField.classList.add("collapse");

    title.textContent = todo.title;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;
    hiddenField.textContent = `Description: ${todo.description || "none"}`;

    viewField.appendChild(checkbox);
    viewField.appendChild(title);
    viewField.appendChild(dueDate);
    viewField.appendChild(priority);
    viewField.appendChild(expand);
    row.appendChild(viewField);
    row.appendChild(hiddenField);
  };

  return { createRow };
})();

export default TodoUI;
