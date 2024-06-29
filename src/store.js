import Task from "./task";

/**Interacts to localstorage */
class Store {
  /**
   * Retrieves tasks from localStorage or fetches from API if not available locally.
   * @returns {[Task]]} Array of Task objects
   */
  static getTasks() {
    let tasks;



  static addTask(task) {
    const tasks = Store.getTasks();

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static editTask(editedTask) {
    const tasks = Store.getTasks();

    let task = tasks.find((item) => item.id == editedTask.id);

    task.title = editedTask.title;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static toggleTask(id) {
    const tasks = Store.getTasks();

    const task = tasks.find((task) => task.id === id);

    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static removeTask(id) {
    let tasks = Store.getTasks();

    tasks = tasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

export default Store;