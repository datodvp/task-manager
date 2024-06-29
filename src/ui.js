import Store from "./store";
import TaskManager from "./taskManager";

class UI {
  /**Takes tasks list from storage and appends it to DOM */
  static renderTasks() {
    const tasks = Store.getTasks().reverse();
    const listElement = TaskManager.taskListElement;

    listElement.innerHTML = "";

    tasks.forEach((task) => {
      const taskElement = task.getHTMLElement();

      listElement.appendChild(taskElement);
    });
  }

  /**Clears input field */
  static clearInputFields() {
    const list = document.querySelector("#title");
    list.value = "";
  }
}

export default UI;