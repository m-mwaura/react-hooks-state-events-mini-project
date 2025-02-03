import React, { useState } from "react";
import Task from "./Task";
import NewTaskForm from "./NewTaskForm";
import CategoryFilter from "./CategoryFilter";
import { TASKS, CATEGORIES } from "../data";

function App() {
  const [tasks, setTasks] = useState(TASKS);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Handle task deletion
  const handleDelete = (text) => {
    setTasks(tasks.filter((task) => task.text !== text));
  };

  // Handle new task submission
  const handleTaskFormSubmit = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Handle category selection
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Filter tasks based on the selected category
  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);

  return (
    <div className="App">
      <h1>Task List</h1>
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      <NewTaskForm
        categories={CATEGORIES.filter((cat) => cat !== "All")}
        onTaskFormSubmit={handleTaskFormSubmit}
      />
      <div className="tasks">
        {filteredTasks.map((task) => (
          <Task
            key={task.text}
            text={task.text}
            category={task.category}
            onDelete={() => handleDelete(task.text)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
