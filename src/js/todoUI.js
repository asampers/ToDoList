const TodoUI = (() => {
  const createRow = (todo) => {
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

    viewField.classList.add("d-flex", "justify-content-between");
    expand.innerHTML = "<ion-icon name='chevron-down-outline'></ion-icon>";
    expand.classList.add("btn", "btn-sm", "btn-outline-info");
    expand.setAttribute("data-bs-target", `#todo-${todo.index}`);
    expand.setAttribute("data-bs-toggle", "collapse");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    title.textContent = todo.title;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;

    viewField.appendChild(checkbox);
    viewField.appendChild(title);
    viewField.appendChild(dueDate);
    viewField.appendChild(priority);
    viewField.appendChild(expand);

    return viewField;
  };

  const createHiddenField = (todo) => {
    const hiddenField = document.createElement("div");
    const description = document.createElement("span");
    const edit = document.createElement("button");

    hiddenField.id = `todo-${todo.index}`;
    hiddenField.classList.add("collapse", "ps-4");
    edit.classList.add("btn");
    edit.innerHTML = "<ion-icon name='create-outline'></ion-icon>";
    description.textContent = `Description: ${todo.description || "none"}`;

    hiddenField.appendChild(description);
    hiddenField.appendChild(edit);

    return hiddenField;
  };

  const fillRow = (todo, row) => {
    row.appendChild(createViewField(todo));
    row.appendChild(createHiddenField(todo));
  };

  return { createRow };
})();

export default TodoUI;
