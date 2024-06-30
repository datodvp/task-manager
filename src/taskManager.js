import API from "./api";
import Store from "./store";
import Task from "./task";
import UI from "./ui";

class TaskManager {
  // Static elements from DOM
  static taskForm = document.querySelector("#task-form");
  static titleInput = document.querySelector("#title");
  static submitButton = document.querySelector("#submit");
  static taskListElement = document.querySelector("#task-list");

  constructor() {
    this.tasks = Store.getTasks();

    if (this.tasks.length === 0) {
      API.fetchTasks(this); // Sets tasks from API if not in LocalStorage
    }
  }

  /**Displays list of tasks, also creates submit handlers for EDIT and ADD */
  init() {
    UI.renderTasks();
    this._createSubmitHandlers();
  }

  /**Create submit event handlers */
  _createSubmitHandlers() {
    const taskForm = TaskManager.taskForm;

    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (taskForm.dataset.mode === "edit") {
        this._editTask(taskForm.dataset.taskId);
      } else {
        this._addTask();
      }
    });
  }

  _addTask() {
    const title = TaskManager.titleInput.value;
    const task = new Task(null, title); // Creates instance of Task

    Store.addTask(task);

    this.tasks = Store.getTasks(); // Updates changed state from store

    UI.renderTasks();
    UI.clearInputFields();
  }

  _editTask(id) {
    const title = TaskManager.titleInput.value;
    const task = this.tasks.find((task) => task.id == id);

    task.title = title;
    Store.editTask(task);

    this.tasks = Store.getTasks(); // Updates changed state from store

    UI.renderTasks();
    UI.clearInputFields();
    TaskManager.setAddMode(); // Swap back to ADD mode after Editing task
  }

  static setEditMode(task) {
    TaskManager.taskForm.dataset.mode = "edit";
    TaskManager.taskForm.dataset.taskId = task.id; // Sets ID of task in form dataset
    TaskManager.titleInput.value = task.title;
    TaskManager.titleInput.focus();
    TaskManager.submitButton.textContent = "Edit Task";
    window.scrollTo(0, 0);
  }

  static setAddMode() {
    TaskManager.taskForm.dataset.mode = "add";
    TaskManager.submitButton.textContent = "Add Task";
  }
}

export default TaskManager;