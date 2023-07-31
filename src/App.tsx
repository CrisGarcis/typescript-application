import React, { Fragment, useState, useRef } from "react";
type FormElement = React.FormEvent<HTMLFormElement>;
interface TaskState {
  name: string;
  done: boolean;
}
function App(): JSX.Element {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Array<TaskState>>([]);
  const taskInput = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };
  const addTask = (name: string): void => {
    setTasks([...tasks, { name, done: false }]);
    taskInput.current?.focus();
  };
  const toogleDoneTask = (i: number) => {
    const newTasks: TaskState[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };
  const removeTask = (i: number): void => {
    const newTasks: TaskState[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          autoFocus
          ref={taskInput}
        />
        <button>save</button>
      </form>
      {tasks.map((task: TaskState, i) => {
        return (
          <div>
            <h1>{task.name}</h1>
            <button onClick={() => toogleDoneTask(i)}>
              {task.done ? "hecha" : "pendiente"}
            </button>
            <button onClick={() => removeTask(i)}>eliminar</button>
          </div>
        );
      })}
    </Fragment>
  );
}

export default App;
