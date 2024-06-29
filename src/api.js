// import Store from "./store";
// import Task from "./task";
// import TaskManager from "./taskManager";
// import UI from "./ui";

/**Interacts with API */
class API {
  /**
   * Takes instance of Task Manager and sets its tasks from API data
   * @param {TaskManager} taskManager
   */
  static async fetchTasks(taskManager) {
    const apiURL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(apiURL);
      const data = await response.json();

      // Sets tasks for Task Manager instance
      taskManager.tasks = data.map((task) => {
        const newTask = new Task(task.id, task.title, task.completed);
        Store.addTask(newTask);

        return newTask;
      });
      UI.renderTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  }
}

export default API;