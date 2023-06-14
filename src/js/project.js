import { getProjects } from "./index";
import { ProjectUI } from "./projectUI";

const ProjectFactory = (
  title,
  description,
  hideCompleted = false,
  items = {}
) => {
  return { title, description, hideCompleted, items };
};

const createProject = (event) => {
  let formValue = event.target.elements;

  const title = formValue.title.value;
  const desc = formValue.description.value;

  return ProjectFactory(title, desc);
};

const addProject = (project) => {
  const allProjects = getProjects();
  allProjects.push(project);
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
};

const removeProject = () => {
  let answer = confirm("Are you sure you want to delete this project?");
  if (!answer) {
    return;
  }

  const index = ProjectUI.getActiveProject().projectIndex;
  let allProjects = getProjects();
  allProjects.splice(index, 1);
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
  ProjectUI.removeProjectFromUI();
};

export { createProject, addProject, removeProject };
