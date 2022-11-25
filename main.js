//On load, gather and parse all tasks from localStorage. If they do not exist, an empty array will be applied instead. 
window.addEventListener('load', () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const nameInput = document.querySelector('#name');
    const newTaskForm = document.querySelector('#new-form');

    //set the user's name at the top onChange
    const username = localStorage.getItem('username') || '';
    nameInput.value = username;
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });

    newTaskForm.addEventListener('submit', e => {
        e.preventDefault();

        //task object structure
        const task = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        tasks.push(task);
        
        // save new task
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // reset form input
        e.target.reset();

        // Display tasks from local storage
        DisplayTasks();
    })

    DisplayTasks();
})

function DisplayTasks() {
    console.log('DISPLAY TASKS RUNNING')
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    // Iterate through the array of tasks and create an individual element for each one
    tasks.forEach(taskItem => {
        const task = document.createElement('div');
        task.classList.add('todo-item');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteTaskBtn = document.createElement('button');

        input.type = 'checkbox';
        input.checked = taskItem.done;
        span.classList.add('bubble');

        if(taskItem.category == 'home') {
            span.classList.add('home');
        } else if(taskItem.category == 'work') {
            span.classList.add('work');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteTaskBtn.classList.add('delete');

        content.innerHTML = `<input type="text" value="${taskItem.content}" readonly>`
        edit.innerHTML = 'Edit';
        deleteTaskBtn.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteTaskBtn);
        task.appendChild(label);
        task.appendChild(content);
        task.appendChild(actions);
        
        todoList.appendChild(task);
    })
}


