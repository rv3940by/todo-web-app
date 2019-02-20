// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveTask);

function saveTask(e) {
    //  Get form values
    var taskName = document.getElementById('task-enter').value;

    if (!validateForm(taskName)) {
        return false;
    }

    var task = {
        name: taskName
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
        tasksResults.innerHTML += '<div class="task">' +
                                    '<h3 id="task-text">'+taskName+'</h3>' +
                                    '<div class="btn-holder"> ' +
                                        '<button onclick="removeTask(\''+taskName+'\')" id="delete-btn">Remove</button>' +
                                        '<button onclick="completeTask(\''+taskName+'\')" id="complete-btn">Complete</button>' +
                                    '</div>' +
                                  '</div>'
                                  ;
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
    var x = document.querySelectorAll('.task');
    
    for (var i = 0; i < x.length; i++) {
        var target = x[i].firstChild.textContent;
        var bgColor = x[i].style.backgroundColor;

        if (taskName == target) {
            //  if background does not equal to green
            if (bgColor != 'green') {
                x[i].firstChild.style.textDecoration = 'line-through';
                x[i].style.backgroundColor = 'green';
                x[i].lastElementChild.lastElementChild.style.backgroundColor = '#fff';
                x[i].lastElementChild.lastElementChild.textContent = 'undo';
            } 
            //  If background is already green
            else {
                x[i].firstChild.style.textDecoration = 'none';
                x[i].style.backgroundColor = '#fff';
                x[i].lastElementChild.lastElementChild.style.backgroundColor = '#5dd55d';
                x[i].lastElementChild.lastElementChild.textContent = 'complete';
            }

        }
    }
}

function changeBackgroundColor(taskID) {
    taskID.style.backgroundColor = 'green';
}