document.addEventListener('DOMContentLoaded',function(){
    // State
    let toDos = [];
    // DOM Elements
    const todoInput = document.querySelector('#todoInput');
    const todoList = document.querySelector('#todoLists');
    // Initial Render
    render();
    // Add todo lists:
    function addTodo() {
        const text = todoInput.value.trim();
        if(text) {
            toDos.push({
                id: Date.now(),
                text,
                completed: false
            });
            todoInput.value = '';
            render();
        }
    }
    // Delete Todo Lists:
    function deleteTodo(id){
        toDos = toDos.filter(todo => todo.id !== id);
        render();
    }
    // Toggle Completed Todo Lists:
    function toggleComplete(id){
        toDos = toDos.map(todo => todo.id === id? {...todo,completed: !todo.completed} : todo);
        render();
    }
    // Render the changes dynamically:
    function render() {
        todoList.innerHTML = toDos.map(todo => 
            `
            <li data-id="${todo.id}" class="${todo.completed? 'checked' : ''
            }">
                <input
                    type="checkbox"
                    ${todo.completed?'checked':''}
                >
                <span class="todoContainer__text">${todo.text}</span>
                <button class="todoContainer__deleteBtn">Delete</button>
            </li>
            `
        ).join('');
    }
    document.querySelector('.todoContainer__btn').addEventListener('click', addTodo);
    // Using Event Delegation to call the deleteTodo() function:
    todoList.addEventListener('click',function(e){
        if(e.target.classList.contains('todoContainer__deleteBtn')) {
            const id = Number(e.target.closest('li').dataset.id);
            deleteTodo(id);
        }
    })
    // Using Event Delegation to call the toggleComplete() function:
    todoList.addEventListener('change',function(e){
        if(e.target.type === 'checkbox'){
            const id = Number(e.target.closest('li').dataset.id);
            toggleComplete(id);
        }
    })
    // Add todo on Enter Key
    todoInput.addEventListener('keypress',function(e){
        if(e.key === 'Enter')
            addTodo();
    })
})

// NOTE: 
// data-id="${todo.id}" is an example of using a data attribute in HTML with a dynamic value in JavaScript. It's commonly used to store custom data specific to an HTML element, making it accessible via JavaScript for various purposes.