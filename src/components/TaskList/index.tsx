import { useState } from 'react';
import { ITask } from '../../data';
interface IProps {
  countOpenTasks: number,
  countDoneTasks: number,
  tasks: Array<ITask>,
  onCompleteTask: (event : React.MouseEvent<HTMLDivElement, MouseEvent>, taskId : number) => void,
  onRemoveTask: (event : React.MouseEvent<HTMLDivElement, MouseEvent>, taskId : number) => void
}

export const TaskList : React.FC<IProps> = ({ countOpenTasks, countDoneTasks, tasks, onCompleteTask, onRemoveTask}) => {
  const [filter, setFilter] = useState("all");

  return (
    <>
      { 
        tasks.length > 0 ?
        <div className="flex flex-col w-2/4">
          <div className="task-list backdrop-blur-md scroll-smooth bg-white/30 rounded-xl drop-shadow-lg overflow-auto mb-3 p-2.5 flex justify-between">
            <button className={`duration-150 hover:bg-blue-500 font-semibold hover:text-white py-1 px-2 border hover:border-transparent rounded ${filter === "all" ? "bg-blue-500 border-transparent" : "border-white"}`} onClick={() => setFilter("all")}>Все</button>
            <button className={`duration-150 hover:bg-blue-500 font-semibold hover:text-white py-1 px-2 border hover:border-transparent rounded ${filter === "opened" ? "bg-blue-500 border-transparent" : "border-white"}`} onClick={() => setFilter("opened")}>Открытые задачи</button>
            <button className={`duration-150 hover:bg-blue-500 font-semibold hover:text-white py-1 px-2 border hover:border-transparent rounded ${filter === "closed" ? "bg-blue-500 border-transparent" : "border-white"}`} onClick={() => setFilter("closed")}>Закрытые задачи</button>  
          </div> 
          <div className="task-list backdrop-blur-md scroll-smooth bg-white/30 rounded-xl drop-shadow-lg overflow-auto max-h-48 p-3.5">
            <div className="flex justify-between">
              <span>Задачи</span>
              <div>
                <span className="mr-2.5">Открыто: {countOpenTasks}</span>
                <span>Выполнено: {countDoneTasks}</span>
              </div>
            </div>
            <div className="task-list__wrapper">
              {
                tasks.map(task => {
                  if (filter === "opened" && !task.complete) {
                    return <TaskItem task={task} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask}/>;
                  }
                  if (filter === "closed" && task.complete) {
                    return <TaskItem task={task} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask}/>;
                  }
                  if (filter === "all" ) {
                    return <TaskItem task={task} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask} />;
                  }
                  return undefined;
                })
              }
            </div>
          </div>
        </div>
        : null
      }  
    </>
  )
}

interface ITaskItemProps {
  task: ITask,
  onCompleteTask: (event : React.MouseEvent<HTMLDivElement, MouseEvent>, taskId : number) => void,
  onRemoveTask: (event : React.MouseEvent<HTMLDivElement, MouseEvent>, taskId : number) => void
}

const TaskItem : React.FC<ITaskItemProps> = ({task, onCompleteTask, onRemoveTask}) => {
  return (
    <div
      key={task.id}
      className={`p-2.5 mt-2.5 rounded-md flex items-center justify-between cursor-pointer ${task.complete ? 'bg-emerald-500' : 'bg-violet-500'} duration-150`}
      onClick={(event) => onCompleteTask(event, task.id)}
    >
      <div>
        <div className="font-bold">
          {task.title}
        </div>
        <div className="mt-0.5 text-xs font-light">
          {task.description}
        </div>
      </div>
      <div className="flex">
        <div className={`flex items-center justify-center rounded-lg bg-emerald-50 w-6 h-6 ${task.complete ? '' : 'hidden'} duration-150`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#50c878" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div 
          className="ml-3 flex items-center justify-center rounded-lg bg-red-50 w-6 h-6 hover:bg-red-400 duration-150"
          onClick={(event) => onRemoveTask(event, task.id) }
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#f22952" className="w-5 h-5 hover:stroke-white duration-150">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
  )
}
