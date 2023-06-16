import { getProjects } from "./index";
import { TodoUI } from "./todoUI";
import { removeProject } from "./project";

const ProjectUI = (() => {
  const sidebar = document.querySelector(".sidebar");
  let projectIndex;
  let activeProject;
  let activeProjectElem;
  let projTitle = document.querySelector(".proj-title");
  let projDesc = document.querySelector(".proj-desc");
  let projDelete = document.querySelector(".proj-delete");
  let newTaskBtn = document.querySelector(".new-task-btn");
  let showHide = document.querySelector(".show-hide-completed");
  let sideCloseBtn = document.querySelector(".sidebar-btn");
  const completedList = document.querySelector(".completed-list");

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

  const removeAllChildren = (list, child) => {
    while (child) {
      list.removeChild(child);
      child = list.lastElementChild;
    }
  };
  const clearProjectTodos = () => {
    let toDoList = document.querySelector(".todo-list");
    let completedList = document.querySelector(".completed-list");
    let child = toDoList.lastElementChild;
    let completedChild = completedList.lastElementChild;
    removeAllChildren(toDoList, child);
    removeAllChildren(completedList, completedChild);
  };

  const renderAllProjectTodos = () => {
    for (const key in activeProject.items) {
      TodoUI.addTodoToUI(activeProject.items[key]);
    }
    activeProject.hideCompleted
      ? completedList.classList.add("visually-hidden")
      : completedList.classList.remove("visually-hidden");
  };

  const clearProjectHeader = () => {
    projTitle.textContent = "";
    projDesc.textContent = "";
    showHide.textContent = "";
    projDelete.classList.add("d-none");
    newTaskBtn.classList.add("d-none");
  };

  const renderProjectHeader = (activeProject) => {
    projTitle.textContent = activeProject.title;
    projDesc.textContent = activeProject.description;
    projDelete.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
    projDelete.addEventListener("click", removeProject);
    projDelete.classList.remove("d-none");
    newTaskBtn.classList.remove("d-none");
  };

  const toggleShowHideStatus = () => {
    let allProjects = getProjects();
    const index = ProjectUI.getActiveProject().projectIndex;
    allProjects[index].hideCompleted = !allProjects[index].hideCompleted;
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
    activeProject = getProjects()[index];
    activeProject.hideCompleted
      ? completedList.classList.add("visually-hidden")
      : completedList.classList.remove("visually-hidden");
  };

  const setShowHideContent = () => {
    return activeProject.hideCompleted ? "Show Completed" : "Hide Completed";
  };

  const renderShowHideLink = () => {
    if (
      completedList.hasChildNodes() ||
      completedList.classList.contains("visually-hidden")
    ) {
      showHide.textContent = setShowHideContent();
    } else {
      showHide.textContent = "";
    }
  };

  const toggleShowHide = () => {
    toggleShowHideStatus();
    renderShowHideLink();
  };

  const printProject = (e) => {
    if (activeProjectElem) {
      activeProjectElem.classList.remove("active");
    }
    projectIndex = findProject(e.target.parentNode);
    e.target.classList.add("active");
    activeProject = getProjects()[projectIndex];
    activeProjectElem = e.target;

    renderProjectHeader(activeProject);
    clearProjectTodos();
    renderAllProjectTodos();
    renderShowHideLink();
    showHide.addEventListener("click", toggleShowHide);
    if (sideCloseBtn) {
      sideCloseBtn.click();
    }
  };

  const chooseNextProjAfterDel = () => {
    let temp;

    if (activeProjectElem.parentNode.nextElementSibling) {
      temp = activeProjectElem.parentNode.nextElementSibling;
    }
    if (activeProjectElem.parentNode.previousElementSibling) {
      temp = activeProjectElem.parentNode.previousElementSibling;
    }
    return temp;
  };

  const removeProjectFromUI = () => {
    let temp = chooseNextProjAfterDel();
    sidebar.removeChild(activeProjectElem.parentNode);
    if (temp) {
      temp.firstElementChild.click();
    } else {
      clearProjectHeader();
      clearProjectTodos();
    }
  };

  const findProject = (element) => {
    let index = Array.from(sidebar.children).indexOf(element);
    return index;
  };

  const getActiveProject = () => {
    return { projectIndex, activeProjectElem, activeProject };
  };

  return {
    addAllProjectsToUI,
    addNewProjectToUI,
    getActiveProject,
    removeProjectFromUI,
    renderShowHideLink,
  };
})();

export { ProjectUI };
