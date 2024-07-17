import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import { TodoContextProvider } from "./context";
import TodoItem from "./components/TodoItem";


function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }
  const deleteTodo = (id) => {
    setTodos(
      (prev) =>
        prev.filter((todo) =>
          (todo.id !== id)
        )
    )
  }
  const updateTodo = (id, todo) => {
    setTodos(
      (prev) =>
        prev.map((prevTodo) =>
          (prevTodo.id === id ? todo : prevTodo)
        )
    )
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, isCompleted: !prevTodo.isCompleted } : prevTodo)))
  }

  useEffect(() => {
    const Todos = JSON.parse(localStorage.getItem('todos'))

    if (Todos && Todos.length > 0) {
      setTodos(Todos)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  return (
    <TodoContextProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{<TodoForm />}</div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
