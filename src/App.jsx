import { useState } from "react";
import { Input, Button, Typography, IconButton } from "@mui/joy";
import { Edit, Delete, Save } from "@mui/icons-material";
import "./index.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [editText, setEditText] = useState("");
  const [newTodoText, setNewTodoText] = useState("");

  function handleAddTodo(e) {
    e.preventDefault();
    const newItem = { id: Date.now(), text: newTodoText };

    if (!newTodoText) return;

    setTodos(function (todos) {
      return [...todos, newItem];
    });
    setNewTodoText("");
  }

  function handleDeleteTodo(id) {
    setTodos(function (todos) {
      return todos.filter(function (todo) {
        return todo.id !== id;
      });
    });
  }

  function handleEditStart(id, text) {
    setEditText(text);
    setEditingId(id);
  }

  function handleEditChange(e) {
    setEditText(e.target.value);
  }

  function handleEditSave(id) {
    if (editText === "") return;

    setTodos(function (todos) {
      return todos.map(function (todo) {
        return todo.id === id ? { ...todo, text: editText } : todo;
      });
    });
    setEditingId(null);
  }

  return (
    <div className="container">
      <div className="box">
        <div className="todo-container">
          <div className="to-do-heading">
            <Typography level="h2">To Do</Typography>
          </div>
          {todos.map(function (todo) {
            return (
              <div className="todo-item" key={todo.id}>
                {editingId === todo.id ? (
                  <>
                    <Input
                      autoFocus
                      value={editText}
                      onChange={handleEditChange}
                      onKeyDown={function (e) {
                        handleKeyPress(e, todo.id);
                      }}
                      className="editable-input"
                    />
                    <div className="action-buttons">
                      <IconButton
                        onClick={function () {
                          handleEditSave(todo.id);
                        }}
                      >
                        <Save />
                      </IconButton>
                    </div>
                  </>
                ) : (
                  <>
                    <Typography level="body2">{todo.text}</Typography>
                    <div className="action-buttons">
                      <IconButton
                        onClick={function () {
                          handleEditStart(todo.id, todo.text);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={function () {
                          handleDeleteTodo(todo.id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="add-todo">
          <Input
            className="add-description-input"
            placeholder="Add a description"
            value={newTodoText}
            onChange={function (e) {
              setNewTodoText(e.target.value);
            }}
          />
          <Button onClick={handleAddTodo} className="add-button">
            Add
          </Button>
        </div>
      </div>
      <Typography className="date">
        {new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </Typography>
    </div>
  );
}

export default TodoList;
