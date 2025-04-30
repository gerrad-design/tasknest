import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchIndex, setSearchIndex] = useState(0);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    if (storedTasks) setTasks(storedTasks);
    if (storedCompletedTasks) setCompletedTasks(storedCompletedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  useEffect(() => {
    setSearchIndex(0); // Reset index when search term changes
  }, [searchTerm]);

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

  const matchingTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTasks = searchTerm
    ? (matchingTasks[searchIndex] ? [matchingTasks[searchIndex]] : [])
    : tasks;

  const matchingCompleted = completedTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompletedTasks = searchTerm
    ? (matchingCompleted[searchIndex] ? [matchingCompleted[searchIndex]] : [])
    : completedTasks;

  const handleSearch = () => {
    const totalMatches = matchingTasks.length;
    setSearchIndex(prev => (prev + 1 < totalMatches ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between p-8">
      <div>
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">TaskNest</h1>
          <div className="flex gap-2 flex-col md:flex-row">
            <input
              type="text"
              placeholder="Search tasks..."
              className="px-4 py-2 rounded bg-gray-700 text-white w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
              >
                Search
              </button>
              <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Task
              </button>
            </div>
          </div>
        </header>

        {/* Active Tasks */}
        <div className="mb-10">
          <h2 className="text-2xl hover:underline font-semibold mb-4">Active Tasks</h2>
          {filteredTasks.length > 0 ? (
            <div className="grid gap-4">
              {filteredTasks.map((task, index) => (
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
            <p className="text-gray-400">No active tasks match your search.</p>
          )}
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className="text-2xl hover:underline font-semibold mb-4">Completed Tasks</h2>
          {filteredCompletedTasks.length > 0 ? (
            <div className="grid gap-4">
              {filteredCompletedTasks.map((task, index) => (
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
            <p className="text-gray-500">No completed tasks match your search.</p>
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
