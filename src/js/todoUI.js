const TodoUI = (() => {
  const addNewTodoToUI = (todo) => {
    const todoList = document.querySelector(".todo-list");
    const row = document.createElement("div");

    row.classList.add("mb-3", "border", "rounded", "p-2");

    fillRow(todo, row);
    todoList.appendChild(row);
  };

  const createViewField = (todo) => {
    const viewField = document.createElement("div");
    const checkbox = document.createElement("input");
    const title = document.createElement("span");
    const dueDate = document.createElement("span");
    const priority = document.createElement("span");
    const expand = document.createElement("button");
    const edit = document.createElement("button");
    const btnDiv = document.createElement("div");
    const titleCheckDiv = document.createElement("div");

    viewField.classList.add("d-flex", "justify-content-between");
    checkbox.type = "checkbox";
    checkbox.classList.add("me-3");
    expand.classList.add("btn", "btn-sm", "btn-outline-info");
    expand.setAttribute("data-bs-target", `#todo-${todo.index}`);
    expand.setAttribute("data-bs-toggle", "collapse");
    edit.classList.add("btn", "btn-sm", "btn-outline-success", "ms-3");

    checkbox.checked = todo.completed;
    title.textContent = todo.title;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;
    expand.innerHTML = "<ion-icon name='chevron-down-outline'></ion-icon>";
    edit.innerHTML = "<ion-icon name='create-outline'></ion-icon>";

    titleCheckDiv.appendChild(checkbox);
    titleCheckDiv.appendChild(title);
    btnDiv.appendChild(expand);
    btnDiv.appendChild(edit);

    viewField.appendChild(titleCheckDiv);
    viewField.appendChild(dueDate);
    viewField.appendChild(priority);
    viewField.appendChild(btnDiv);

    return viewField;
  };

  const createHiddenField = (todo) => {
    const hiddenField = document.createElement("div");
    const description = document.createElement("span");

    hiddenField.id = `todo-${todo.index}`;
    hiddenField.classList.add("collapse", "ps-4");

    description.innerHTML = `<u>Description</u>: ${todo.description || "none"}`;

    hiddenField.appendChild(description);

    return hiddenField;
  };

  const fillRow = (todo, row) => {
    row.appendChild(createViewField(todo));
    row.appendChild(createHiddenField(todo));
  };

  return { addNewTodoToUI };
})();

export { TodoUI };
