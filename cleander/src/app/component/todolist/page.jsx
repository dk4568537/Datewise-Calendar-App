"use client";
import DashboardComponent from "@/app/Dashboard/page";
import React, { useState } from "react";

const page = () => {
  const [tasks, setTasks] = useState(["Milk", "Butter"]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <DashboardComponent>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mb-4"
          >
            Add
          </button>
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="bg-gray-200 px-4 py-2 rounded flex justify-between items-center"
              >
                <span>{task}</span>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardComponent>
  );
};
export default page;
