import { getProjects } from './index';

const ProjectFactory = (title, description, items={}) => {
  
  return { title, description, items };
}

const createProject = (event) => {
  let formValue = event.target.elements;
	
  const title = formValue.title.value;
	const desc = formValue.description.value;

  return ProjectFactory(title, desc);
}

const addProject = (project) => {
  const allProjects = getProjects();
  allProjects.push(project);
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
}

export { createProject, addProject };