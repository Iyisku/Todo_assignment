import React from "react";
import Header from "../Components/Header";
import TodoForm from "../Components/TodoComponents/Todoform";
import TodoItems from "../Components/TodoComponents/Todoitems";

const TodoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <div className="flex">


        {/* Main content */}
        <main className="flex-1 flex-col p-8">
          <TodoForm />
            <TodoItems />
        </main>
      </div>
    </div>
  );
};

export default TodoPage;
