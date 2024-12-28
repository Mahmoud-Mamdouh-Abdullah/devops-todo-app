const API_URL = 'http://localhost:3000/api/todos';

const taskInput = document.getElementById('task');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

// Fetch all todos and render
const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const todos = await response.json();
    renderTodos(todos);
};

// Render todos
const renderTodos = (todos) => {
    todoList.innerHTML = ''; // Clear the list before re-rendering

    Object.entries(todos).forEach(([id, todo]) => {
        // Create a list item
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center'; // Bootstrap classes for styling

        // Add task content and delete button
        li.innerHTML = `
            <span>${todo.task}</span>
            <button class="btn btn-danger btn-sm" onclick="deleteTodo('${id}')">Delete</button>
        `;

        // Append the styled list item to the ul
        todoList.appendChild(li);
    });
};

// Add a new todo
addTodoButton.addEventListener('click', async () => {
    const task = taskInput.value.trim();
    if (!task) return alert('Please enter a task');
    const id = Date.now().toString(); // Simple unique ID
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, task }),
    });
    taskInput.value = '';
    fetchTodos();
});

// Delete a todo
const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
};

// Initial load
fetchTodos();
