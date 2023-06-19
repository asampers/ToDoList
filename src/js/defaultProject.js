const defaultProject = () => {
  if (!localStorage.getItem("allProjects")) {
    let items = {
      0: {
        title: "Laundry",
        description: "",
        dueDate: "2023-05-11",
        priority: "Medium",
        completed: false,
        index: 0,
      },
      1: {
        title: "Gym",
        description: "leg day!",
        dueDate: "2023-05-11",
        priority: "High",
        completed: false,
        index: 1,
      },
      2: {
        title: "Tan",
        description: "how we do in the O.C.",
        dueDate: "2023-05-11",
        priority: "",
        completed: false,
        index: 2,
      },
    };
    let allProjects = [
      {
        title: "My List",
        description: "things I gotta do",
        hideCompleted: false,
        items,
      },
    ];
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
  }
};

export default defaultProject;
