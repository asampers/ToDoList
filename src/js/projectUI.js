import { getProjects } from "./index";

const projectUI = () => {
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

  }

  
}