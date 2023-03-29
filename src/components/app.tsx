import { useEffect, useState } from 'react';
import { TaskInputForm } from './TaskInputForm';
import { TaskList } from './TaskList';
import { ITask } from '../data';

export default function App () {
  const [tittleIsFilled, setTittleIsFilled] = useState<boolean>(false);
  const [tasks, setTask] = useState<ITask[]>([]);
  const [countDoneTasks, setCountDoneTasks] = useState<number>(0);
  const [countOpenTasks, setCountOpenTasks] = useState<number>(0);

  useEffect(() => {
    const tasksCount : number = tasks.length;
    const doneTasksCount : number = tasks.filter((task : ITask) => task.complete === true).length;
    setCountDoneTasks(doneTasksCount);
    setCountOpenTasks(tasksCount - doneTasksCount);
  }, [tasks])

  const onAddTask : React.FormEventHandler<HTMLFormElement> = (event)  => {
    event.preventDefault();
    const title : string = event.currentTarget.task_title.value.trim();
    const description : string = event.currentTarget.task_text.value.trim();

    setTask(tasks => [...tasks, {
      id: Date.now(),
      title: title,
      description: description,
      complete: false
    }]);
    event.currentTarget.reset();
    event.currentTarget.task_title.focus();
  };

  const onTypeTitle : React.ChangeEventHandler<HTMLInputElement> = (event) : void => {
    event.target.value.length > 0 ? setTittleIsFilled(true) : setTittleIsFilled(false);
  };
  const onCompleteTask = (event : React.MouseEvent<HTMLDivElement, MouseEvent>, taskId : number) : void => {
    event.preventDefault();
    
    setTask((tasks: ITask[]) : ITask[] => {
      let newTaskList = tasks.map((task : ITask) => {
        if (task.id === taskId) {
          task.complete = true;
        }
        return task;
      });
      return [...newTaskList];
    });
  };
  const onRemoveTask = (event : React.MouseEvent<HTMLDivElement, MouseEvent>, taskId : number) : void => {
    event.preventDefault();

    setTask((tasks: ITask[]) : ITask[]=> {
      let newTaskList = tasks.filter((task : ITask) => task.id !== taskId)
      return [...newTaskList];
    });
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-1/2 h-auto flex justify-center items-center task-wrapper text-slate-50">
        <TaskInputForm
          onAddTask = {onAddTask}
          onTypeTitle = {onTypeTitle}
          tittleIsFilled = {tittleIsFilled}
        />
        <TaskList
          countOpenTasks = { countOpenTasks }
          countDoneTasks = { countDoneTasks }
          onCompleteTask = { onCompleteTask }
          onRemoveTask = { onRemoveTask }
          tasks = { tasks }
        />
      </div>
    </div>
  )
}
