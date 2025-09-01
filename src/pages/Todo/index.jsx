import { useState, useEffect } from "react";
import styles from "./Todo.module.scss";

let uniqId = 0;

import { MdDelete } from "react-icons/md";

function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(todoList);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trang reload khi submit form

    if (inputValue.trim()) {
      const todoList = [
        ...todos,
        {
          id: ++uniqId,
          text: inputValue,
          completed: false,
        },
      ];

      setTodos(todoList);
      localStorage.setItem("todos", JSON.stringify(todoList));
      setInputValue(""); // Reset input sau khi thêm todo
    }
  };

  const deleteTodo = (id) => {
    const todoList = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todoList));
    setTodos(todoList);
  };

  const toggleTodo = (id) => {
    const todoList = todos.map((todo) =>
      todo.id === id
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo
    );
    localStorage.setItem("todos", JSON.stringify(todoList));
    setTodos(todoList);
  };

  const total = todos.length;
  const completed = todos?.filter(todo => todo.completed).length;
  const remaining = total - completed;

  return (
    <>
      <h1 className={styles.heading}>
        Todo List App
      </h1>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.addTodo}>
          <input
            type="text"
            placeholder="Thêm mục mới..."
            value={inputValue}
            onChange={handleInputChange}
          />

          <button type="submit">Thêm</button>
        </div>

        {todos.length === 0 ? <div className={styles.todoEmpty}>
          Chưa có task nào. Hãy thêm task đầu tiên!
        </div> : (
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li
                className={`${styles.todoItem} ${todo.completed ? "completed" : ""}`}
                key={index}
              >
                <div className={styles.todoInputLable}>
                  <input
                    type="checkbox"
                    id={todo.id}
                    name="todo"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <label htmlFor={todo.id}>{todo.text}</label>
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={styles.todoDetele}
                >
                  <MdDelete size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <div>
            <p><strong>Tổng:</strong> {total} task(s)</p>
            <p><strong>Hoàn thành:</strong> {completed} task(s)</p>
            <p><strong>Còn lại:</strong> {remaining} task(s)</p>
          </div>
        )}
      </form>
    </>
  );
}

export default Todo;

