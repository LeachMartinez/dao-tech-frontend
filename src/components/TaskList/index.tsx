import { ITask } from '../../data';
interface IProps {
  countOpenTasks: number,
  countDoneTasks: number,
  tasks: Array<ITask>,
  onCompleteTask: (event : React.MouseEvent<HTMLDivElement, MouseEvent>, taskId : number) => void,
  onRemoveTask: (event : React.MouseEvent<HTMLDivElement, MouseEvent>, taskId : number) => void
}

export const TaskList : React.FC<IProps> = ({ countOpenTasks, countDoneTasks, tasks, onCompleteTask, onRemoveTask}) => {

  return (
      <div className="task-list backdrop-blur-md scroll-smooth bg-white/30 rounded-xl drop-shadow-lg w-2/4 overflow-auto max-h-64 p-2.5">
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
            })
          }
        </div>
      </div>
  )
}