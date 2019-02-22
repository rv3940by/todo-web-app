// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveTask);

function saveTask(e) {
    //  Get form values
    var taskName = document.getElementById('task-enter').value;

    if (!validateForm(taskName)) {
        return false;
    }

    var task = {
        name: taskName,
        complete: false
    }

    //  Test if tasks is null
    if (localStorage.getItem('tasks') === null) {
        // Init array
        var tasks = [];
        //  Add to array
        tasks.push(task);
        //  Set to LocalStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        //  Get tasks from localStorage
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        //  Add tasks to array
        tasks.push(task);
        //  Re-set back to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //  Clear from
    document.getElementById('myForm').reset();

    e.preventDefault();

    fetchTask();
}

// Remove Task
function removeTask(taskName) {
    //  Get tasks from localStorage
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    // Loop through tasks
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].name == taskName) {
            //  Remove from array
            tasks.splice(i, 1);
        }
    }
    //  Re-set back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //  Re-fetch tasks
    fetchTask();
}

//  Fetch Tasks
function fetchTask() {
    //  Get tasks from localStorage
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    //  Get output id
    var tasksResults = document.getElementById('tasksResults');

    //  Build output
    tasksResults.innerHTML = "";

    for (var i = 0; i < tasks.length; i++) {
        var taskName = tasks[i].name;
        if (tasks[i].complete == true){
            tasksResults.innerHTML +=   '<div class="task complete">' +
                                            '<h3 id="task-text">'+taskName+'</h3>' +
                                            '<div class="btn-holder"> ' +
                                                '<button style="background-color: #fff;" onclick="completeTask(\''+taskName+'\')" id="complete-btn">undo</button>' +    '<button onclick="updateTask(\''+taskName+'\')" class="update-btn" id="update-btn">update</button>' +     '<button onclick="removeTask(\''+taskName+'\')" id="delete-btn">Remove</button>' +
                                            '</div>' +
                                        '</div>'
                                        ;            
        } else {
            tasksResults.innerHTML +=   '<div class="task">' +
                                            '<h3 id="task-text">'+taskName+'</h3>' +
                                            '<div class="btn-holder"> ' +
                                                '<button onclick="completeTask(\''+taskName+'\')" id="complete-btn">complete</button>' +    '<button onclick="updateTask(\''+taskName+'\')" class="update-btn" id="update-btn">update</button>' +     '<button onclick="removeTask(\''+taskName+'\')" id="delete-btn">Remove</button>' +
                                            '</div>' +
                                        '</div>'
                                        ;
        }
    }
}

//  Validate if there's an input
function validateForm(taskName) {
    if (!taskName) {
        alert('Please fill in the form');
        return false;
    }
    
    return true;
}

//  Complete Task Funciton
function completeTask(taskName) {
    //  Get tasks from localStorage
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    var x = document.querySelectorAll('.task');
    
    for (var i = 0; i < x.length; i++) {
        var target = x[i].firstChild.textContent;
        if (taskName == target) {
            //  if background does not equal to green
                for (var j = 0; j < tasks.length; j++){
                    if (tasks[j].name == taskName) {
                        if (tasks[j].complete == false) {
                            tasks[j].complete = true;
                        }
                        //  If background is already green
                        else {
                            tasks[j].complete = false;
                        }                          
                    }             
                }
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //  Re-fetch tasks
    fetchTask();    
}

// Update function
function updateTask(tskName) {
    //  Get tasks from localStorage
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    var promptVal = prompt('Enter your new task here');

    if (promptVal == null || promptVal == "") {
        alert('Please enter a new value before update.')
    } else {
        // Get the sibling of target parent
        var text = tskName;
        if (confirm('Do you wish to update this value?')) {
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].name == tskName) {
                    tasks[i].name = promptVal;
                }
            }        
        } else {
            //  Don't do anything
            return false;
        }
    }
    
    // Re-set back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //  Re-fetch tasks
    fetchTask();
}