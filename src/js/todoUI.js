import { removeToDo, completedToDo, callEditForm } from "./todo";

const TodoUI = (() => {
  const addTodoToUI = (todo) => {
    const editedToDo = document.querySelector(`#todo-${todo.index}`);
    const todoList = document.querySelector(".todo-list");
    const completedList = document.querySelector(".completed-list");
    const row = document.createElement("div");

    row.id = `todo-${todo.index}`;
    row.classList.add(
      "mb-3",
      "border",
      "rounded",
      "p-2",
      "bg-light",
      "shadow-sm"
    );

    fillRow(todo, row);

    if (editedToDo) {
      return editedToDo.replaceWith(row);
    }

    todo.completed ? completedList.appendChild(row) : todoList.appendChild(row);
  };

  const lineThrough = (completed, div) => {
    if (completed) {
      div.style.textDecoration = "line-through";
      div.classList.add("text-secondary");
    }
  };

  const setAndStyleCheckbox = (checkbox, todo) => {
    checkbox.type = "checkbox";
    checkbox.classList.add("me-3");
    checkbox.checked = todo.completed;
    checkbox.setAttribute("data-todo", `${todo.index}`);
    checkbox.addEventListener("click", completedToDo);
  };

  const setAndStyleExpand = (expand, todo) => {
    expand.classList.add("btn", "btn-sm", "btn-outline-info");
    expand.setAttribute("data-bs-target", `#info-${todo.index}`);
    expand.setAttribute("data-bs-toggle", "collapse");
    expand.innerHTML = "<ion-icon name='chevron-down-outline'></ion-icon>";
  };

  const createViewField = (todo) => {
    const viewField = document.createElement("div");
    const checkbox = document.createElement("input");
    const title = document.createElement("span");
    const dueDate = document.createElement("span");
    const priority = document.createElement("span");
    const expand = document.createElement("button");
    const titleCheckDiv = document.createElement("div");
    let formatDistanceToNow = require("date-fns/formatDistanceToNow");

    viewField.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    lineThrough(todo.completed, viewField);
    titleCheckDiv.classList.add("w-50", "title-check-div");
    title.classList.add("todo-title");
    priority.classList.add("priority");

    setAndStyleCheckbox(checkbox, todo);
    setAndStyleExpand(expand, todo);
    title.textContent = todo.title;
    dueDate.textContent = formatDistanceToNow(todo.dueDate);
    priority.textContent = todo.priority;

    titleCheckDiv.appendChild(checkbox);
    titleCheckDiv.appendChild(title);
    viewField.appendChild(titleCheckDiv);
    viewField.appendChild(dueDate);
    viewField.appendChild(priority);
    viewField.appendChild(expand);

    return viewField;
  };

  const setAndStyleEdit = (edit, todo) => {
    edit.classList.add("btn", "btn-sm", "btn-outline-success", "me-2");
    edit.setAttribute("data-edit-id", `${todo.index}`);
    edit.setAttribute("data-bs-toggle", "modal");
    edit.setAttribute("data-bs-target", "#taskModal");
    edit.setAttribute("data-edit-title", "Edit Task");
    edit.addEventListener("click", callEditForm);
    edit.innerHTML = "<ion-icon name='create-outline'></ion-icon>";
  };

  const setAndStyleDelete = (deleteBtn, todo) => {
    deleteBtn.classList.add(
      "btn",
      "btn-sm",
      "btn-outline-danger",
      "task-delete"
    );
    deleteBtn.setAttribute("data-id", `${todo.index}`);
    deleteBtn.addEventListener("click", removeToDo);
    deleteBtn.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
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

    setAndStyleEdit(edit, todo);
    setAndStyleDelete(deleteBtn, todo);
    description.innerHTML = `<u>Description</u>: ${todo.description || "none"}`;

    if (!todo.completed) {
      btnDiv.appendChild(edit);
    }
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
