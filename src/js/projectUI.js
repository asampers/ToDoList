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

  }

  const createProjectList = (project) => {
    let projectLi = document.createElement('li');
    projectLi.classList.add('nav-item');
    let projectA = document.createElement('a');
    projectA.classList.add('nav-link', 'link-dark');
    projectLi.appendChild(projectA);
    sidebar.append(projectLi);
    projectA.textContent = project.title;
    return projectA;
  }

  return { addAllProjectsToUI };
})();

export { ProjectUI };