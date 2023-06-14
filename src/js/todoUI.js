import { removeToDo, completedToDo, callEditForm } from "./todo";

const TodoUI = (() => {
  const addTodoToUI = (todo) => {
    const todoList = document.querySelector(".todo-list");
    const completedList = document.querySelector(".completed-list");
    const row = document.createElement("div");

    row.id = `todo-${todo.index}`;
    row.classList.add("mb-3", "border", "rounded", "p-2");

    fillRow(todo, row);
    todo.completed ? completedList.appendChild(row) : todoList.appendChild(row);
  };

  const lineThrough = (completed, div) => {
    if (completed) {
      div.style.textDecoration = "line-through";
      div.classList.add("text-secondary");
    }
  };

  const createViewField = (todo) => {
    const viewField = document.createElement("div");
    const checkbox = document.createElement("input");
    const title = document.createElement("span");
    const dueDate = document.createElement("span");
    const priority = document.createElement("span");
    const expand = document.createElement("button");
    const titleCheckDiv = document.createElement("div");

    viewField.classList.add("d-flex", "justify-content-between");
    lineThrough(todo.completed, viewField);
    titleCheckDiv.classList.add("w-50");
    checkbox.type = "checkbox";
    checkbox.classList.add("me-3");
    priority.classList.add("priority");
    expand.classList.add("btn", "btn-sm", "btn-outline-info");
    expand.setAttribute("data-bs-target", `#info-${todo.index}`);
    expand.setAttribute("data-bs-toggle", "collapse");

    checkbox.checked = todo.completed;
    checkbox.setAttribute("data-todo", `${todo.index}`);
    checkbox.addEventListener("click", completedToDo);
    title.textContent = todo.title;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;
    expand.innerHTML = "<ion-icon name='chevron-down-outline'></ion-icon>";

    titleCheckDiv.appendChild(checkbox);
    titleCheckDiv.appendChild(title);

    viewField.appendChild(titleCheckDiv);
    viewField.appendChild(dueDate);
    viewField.appendChild(priority);
    viewField.appendChild(expand);

    return viewField;
  };

  const createHiddenField = (todo) => {
    const hiddenField = document.createElement("div");
    const description = document.createElement("span");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const btnDiv = document.createElement("div");

    hiddenField.id = `info-${todo.index}`;
    hiddenField.classList.add("collapse", "ps-4", "py-3");
    lineThrough(todo.completed, hiddenField);
    btnDiv.classList.add("float-end");
    edit.classList.add("btn", "btn-sm", "btn-outline-success", "me-2");
    edit.setAttribute("data-edit-id", `${todo.index}`);
    edit.addEventListener("click", callEditForm);
    deleteBtn.classList.add(
      "btn",
      "btn-sm",
      "btn-outline-danger",
      "task-delete"
    );
    deleteBtn.setAttribute("data-id", `${todo.index}`);
    deleteBtn.addEventListener("click", removeToDo);
    description.innerHTML = `<u>Description</u>: ${todo.description || "none"}`;
    edit.innerHTML = "<ion-icon name='create-outline'></ion-icon>";
    deleteBtn.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';

    btnDiv.appendChild(edit);
    btnDiv.appendChild(deleteBtn);
    hiddenField.appendChild(description);
    hiddenField.appendChild(btnDiv);

    return hiddenField;
  };

  const fillRow = (todo, row) => {
    row.appendChild(createViewField(todo));
    row.appendChild(createHiddenField(todo));
  };

  const removeToDoFromUI = (status, div) => {
    document.querySelector(`${status}`).removeChild(div);
  };

  return { addTodoToUI, removeToDoFromUI };
})();

export { TodoUI };
