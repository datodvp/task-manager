import TaskManager from "./src/taskManager";
import "./style.css";

/**
 * Construct and initialize task manager component
 */
document.addEventListener("DOMContentLoaded", () => {
  const taskManager = new TaskManager();

  taskManager.init();
});
