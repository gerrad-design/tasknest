import React, { useState, useEffect } from 'react';


function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  // Load tasks and completed tasks from localStorage when page loads
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    if (storedTasks) setTasks(storedTasks);
    if (storedCompletedTasks) setCompletedTasks(storedCompletedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);
    

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveTask = () => {
    if (taskTitle.trim() !== '') {
      const newTask = {
        title: taskTitle,
        date: taskDate,
        description: taskDescription,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskDate('');
      setTaskDescription('');
      closeModal();
    }
  };

  const completeTask = (index) => {
    const taskToComplete = tasks[index];
    setCompletedTasks([...completedTasks, taskToComplete]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between p-8">
      <div>
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">TaskNest</h1>
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </header>

        {/* Active Tasks */}
        <div className="mb-10">
          <h2 className="text-2xl hover:underline font-semibold mb-4">Active Tasks</h2>
          {tasks.length > 0 ? (
            <div className="grid gap-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition flex justify-between items-start"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{task.title}</h2>
                    <p className="text-sm text-gray-400">{task.date}</p>
                    <p className="mt-2">{task.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => completeTask(index)}
                      className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No active tasks. Do you want to add one?</p>
          )}
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className="text-2xl hover:underline font-semibold mb-4">Completed Tasks</h2>
          {completedTasks.length > 0 ? (
            <div className="grid gap-4">
              {completedTasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded shadow hover:shadow-lg transition line-through text-gray-400"
                >
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <p className="text-sm">{task.date}</p>
                  <p className="mt-2">{task.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tasks completed yet.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded shadow-lg w-80">
            <h2 className="text-2xl mb-4 font-bold">New Task</h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <input
              type="date"
              className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveTask}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
