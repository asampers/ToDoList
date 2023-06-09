import { getProjects } from "./index";
import { TodoUI } from "./todoUI";

const ProjectUI = (() => {
  const sidebar = document.querySelector(".sidebar");
  let projectIndex;
  let activeProject;
  let activeProjectElem;
  let projTitle = document.querySelector(".proj-title");
  let projDesc = document.querySelector(".proj-desc");

  const addAllProjectsToUI = () => {
    let allProjects = getProjects();
    for (let i = 0; i < allProjects.length; i++) {
      createProjectList(allProjects[i]);
    }
  };

  const addNewProjectToUI = (project) => {
    let projectBtn = createProjectList(project);
    projectBtn.click();
  };

  const createProjectList = (project) => {
    let projectLi = document.createElement("li");
    projectLi.classList.add("nav-item", "d-grid", "mb-3");
    let projectBtn = document.createElement("button");
    projectBtn.classList.add("btn", "btn-outline-dark", "btn-block");
    projectLi.appendChild(projectBtn);
    sidebar.append(projectLi);
    projectBtn.textContent = project.title;
    projectBtn.addEventListener("click", printProject);
    return projectBtn;
  };

  const clearProjectTodos = () => {
    let toDoList = document.querySelector(".todo-list");
    let child = toDoList.lastElementChild;
    while (child) {
      toDoList.removeChild(child);
      child = toDoList.lastElementChild;
    }
  };

  const renderAllProjectTodos = () => {
    for (const key in activeProject.items) {
      TodoUI.addNewTodoToUI(activeProject.items[key]);
    }
  };

  const printProject = (e) => {
    if (activeProjectElem) {
      activeProjectElem.classList.remove("active");
    }
    projectIndex = findProject(e.target.parentNode);
    e.target.classList.add("active");
    activeProject = getProjects()[projectIndex];
    activeProjectElem = e.target;

    projTitle.textContent = activeProject.title;
    projDesc.textContent = activeProject.description;
    clearProjectTodos();
    renderAllProjectTodos();
  };

  const findProject = (element) => {
    let index = Array.from(sidebar.children).indexOf(element);
    return index;
  };

  const getActiveProject = () => {
    return { projectIndex, activeProjectElem, activeProject };
  };

  return { addAllProjectsToUI, addNewProjectToUI, getActiveProject };
})();

export { ProjectUI };
