const cors = require('cors');
const path = require('path');
const express = require('express');

app = express();
app.use(cors());
app.use(express.json());

let todos = {};

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/todos', (req, res) => {
    const { id, task } = req.body;
    if (!id || !task) {
        return res.status(400).json({ message: 'ID and task are required' });
    }
    todos[id] = { task };
    res.json({ message: 'Todo added', todo: { id, task } });
});

app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    if (!todos[id]) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    delete todos[id];
    res.json({ message: 'Todo deleted' });
});

app.get('/api/todos', (req, res) => {
    res.json(todos);
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});