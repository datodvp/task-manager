import Store from "./store";
import TaskManager from "./taskManager";
import UI from "./ui";

/**
 * Structure of Task, this makes it possible to
 * create task objects individually and manipulate them
 * */
class Task {
  constructor(id, title, completed) {
    this.id = id || crypto.randomUUID();
    this.title = title;
    this.completed = completed || false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
    Store.toggleTask(this.id);
    UI.renderTasks();
  }

  deleteTask() {
    Store.removeTask(this.id);
    UI.renderTasks();
  }

  /**
   * Array taken from localStorage loses methods so
   * this method helps to recover its methods
   */
  static reviveTask(taskData) {
    return new Task(taskData.id, taskData.title, taskData.completed);
  }
}

export default Task;