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
  /**Build DOM element for Task object
   * @returns {HTMLLIElement} HTML LI element of task object
   */
  getHTMLElement() {
    const li = document.createElement("li");
    this.completed && li.classList.add("completed");

    // create button for DELETE
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("button", "button__red");
    deleteButton.addEventListener("click", () => this.deleteTask());

    // Create button for EDIT MODE
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("button", "button__green");
    editButton.addEventListener("click", () => TaskManager.setEditMode(this));

    // Create checkbox for completed toggle
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    if (this.completed) {
      checkBox.checked = true;
    }
    checkBox.addEventListener("change", () => this.toggleCompleted());

    const buttonsDivider = document.createElement("div");
    buttonsDivider.append(editButton, deleteButton);
    buttonsDivider.style.whiteSpace = "nowrap";
    const text = document.createElement("div");
    text.textContent = `${this.title}`;

    const textDivider = document.createElement("div");
    textDivider.style.display = "flex";
    textDivider.append(checkBox, text);

    li.prepend(textDivider);
    li.appendChild(buttonsDivider);

    return li;
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