import React, {useState} from 'react';

interface ITask {
  id: number;
  title: string,
  description: string,
  complete: boolean
}

export default function App () {
  const [tittleIsFilled, setTittleIsFilled] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [tasks, setTask] = useState<ITask[]>([]);
 
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
  const onHideForm : React.MouseEventHandler<HTMLButtonElement> = (event) : void => {
    event.preventDefault();
    setIsHidden(true);
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
  const onShowForm = (event : React.MouseEvent<HTMLDivElement, MouseEvent>) : void => {
    event.preventDefault();
    setIsHidden(false);
  }
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-1/2 h-auto flex justify-center items-center task-wrapper text-slate-50">
          {
          !isHidden ?
            <form
              onSubmit={onAddTask}
              className="task-input-wrapper h-10 flex-col h-auto flexitems-center backdrop-blur-md bg-white/30 rounded-xl drop-shadow-lg mr-8 p-2.5 w-2/4">
              <div className="task-title-input">
                <label htmlFor="task_title">Название задачи</label>
                <input 
                  type="text" 
                  id="task_title"
                  minLength={5}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите название задачи..."
                  onChange={(event) => onTypeTitle(event)} 
                  required
                />
              </div>
              {
                tittleIsFilled ? 
                <div>
                  <label htmlFor="task_text">
                    Текст задачи
                  </label>
                  <textarea 
                    id="task_text" 
                    rows={4}
                    className="resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 dark:border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Введите текст задачи..."
                  >
                  </textarea>
                  <div className="button-wrapper flex justify-between">
                    <button 
                      className="duration-150 bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                    >
                    Добавить
                    </button>
                    <button 
                      className="duration-150 bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                      onClick={onHideForm}
                    >
                    Закрыть
                    </button>
                  </div>
                </div>
                : null
              }
            </form>
          : 
            <div 
              className='cursor-pointer w-10 h-10 rounded-lg border border-white flex items-center justify-center mr-5'
              onClick={(event) => onShowForm(event)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          }
          {
            tasks.length > 0 ? 
              <div className="task-list backdrop-blur-md scroll-smooth bg-white/30 rounded-xl drop-shadow-lg w-2/4 overflow-auto max-h-64 p-2.5">
                <span>Задачи</span>
                <div className="task-list__wrapper">
                  {
                    tasks.map(task => {
                      return (
                        <div
                          key={task.id}
                          id={`${task.id}`}
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
            :
            null
          }
        </div>
      </div>
  )
}
