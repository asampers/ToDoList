import { getProjects } from "./index";

const ProjectUI = (() => {
  const sidebar = document.querySelector('.sidebar');

  const addAllProjectsToUI = () => {
    let allProjects = getProjects();
    for (let i = 0; i < allProjects.length; i++) {
      createProjectList(allProjects[i]);
    }
  }

  const addNewProjectToUI = (project) => {
    let projectBtn = createProjectList(project);
    projectBtn.click();
  }

  const createProjectList = (project) => {
    let projectLi = document.createElement('li');
    projectLi.classList.add('nav-item', 'd-grid', 'mb-3');
    let projectBtn = document.createElement('button');
    projectBtn.classList.add('btn', 'btn-outline-dark', 'btn-block');
    projectLi.appendChild(projectBtn);
    sidebar.append(projectLi);
    projectBtn.textContent = project.title;
    //projectBtn.addEventListener('click', printProject());
    return projectBtn;
  }

  const printProject = (e) => {

  }

  return { addAllProjectsToUI, addNewProjectToUI };
})();

export { ProjectUI };