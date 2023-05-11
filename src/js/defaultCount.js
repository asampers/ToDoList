const defaultCount = () => {
  if (!localStorage.getItem('allProjects')) {
    localStorage.setItem('count', 2);
  }
}

export default defaultCount;