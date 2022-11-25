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
    })
});

