import { useState } from "react";
import { Box, Input, Button, Typography, IconButton } from "@mui/joy";
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

    if (!newTodoText) return; // Check if newTodoText is falsy

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
      <div className="black-box">
        <div className="todo-container">
          <Typography
            level="h2"
            style={{ margin: "16px auto", textAlign: "center" }}
          >
            To Do
          </Typography>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Input
            placeholder="Add a description"
            value={newTodoText}
            onChange={function (e) {
              setNewTodoText(e.target.value);
            }}
          />
          <Button
            onClick={handleAddTodo}
            style={{ backgroundColor: "#ccc", color: "black" }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
