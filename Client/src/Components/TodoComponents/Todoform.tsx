import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../Redux/features/Todo/todoslice";
import { AppDispatch } from "../../Redux/app/store";

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo({ title: title.trim() }));
      setTitle("");
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;