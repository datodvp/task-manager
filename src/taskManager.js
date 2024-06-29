class TaskManager {
    // Static elements from DOM
    static taskForm = document.querySelector("#task-form");
    static titleInput = document.querySelector("#title");
    static submitButton = document.querySelector("#submit");
    static taskListElement = document.querySelector("#task-list");
  
    constructor() {
      this.tasks = []
  
    }

    init() {

    }


  }
  
  export default TaskManager;