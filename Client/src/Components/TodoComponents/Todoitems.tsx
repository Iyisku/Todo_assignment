import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/app/store";
import {
  fetchTodos,
  deleteTodo,
  updateTodo,
  Todo,
} from "../../Redux/features/Todo/todoslice";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const TodoItems: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos = [], loading, error } = useSelector(
    (state: RootState) => state.todos
  );
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleComplete = (todo: Todo) => {
    dispatch(
      updateTodo({
        id: todo._id,
        updatedData: { completed: !todo.completed },
      })
    );
  };

  const handleEdit = (todo: Todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
  };

  const handleUpdate = () => {
    if (editId && editTitle.trim()) {
      dispatch(
        updateTodo({
          id: editId,
          updatedData: { title: editTitle.trim() },
        })
      );
      setEditId(null);
      setEditTitle("");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
      {!todos || todos.length === 0 ? (
        <p className="text-gray-500 italic">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="bg-black shadow-sm rounded-lg p-6 mx-4 border-2 border-white hover:shadow-lg hover:scale-95 transition-transform duration-500"
            >
              {editId === todo._id ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-white text-white rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo)}
                      className="h-5 w-5 text-black border-gray-300 rounded"
                    />
                    <span
                      className={`text-lg ${
                        todo.completed ? "line-through text-white font-semibold" : "text-white font-bold"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(todo)}
                      title="Edit"
                      className="text-gray-200 hover:text-amber-500 hover:scale-115"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      title="Delete"
                      className="text-gray-200 hover:text-red-600 hover:scale-115"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoItems;
