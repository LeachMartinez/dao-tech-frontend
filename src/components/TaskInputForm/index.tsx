import { useState } from 'react';

interface ITaskInputFormProps {
  onTypeTitle: (event : React.ChangeEvent<HTMLInputElement>) => void,
  onAddTask: React.FormEventHandler<HTMLFormElement>,
  tittleIsFilled: boolean,
}

interface ITaskInputFormButtonProps {
  onShowForm: Function
}

export const TaskInputForm : React.FC<ITaskInputFormProps> = ({onAddTask, onTypeTitle, tittleIsFilled}) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const onHideForm : React.MouseEventHandler<HTMLButtonElement> = (event) : void => {
    event.preventDefault();
    setIsHidden(true);
  };

  const onShowForm = (event : React.MouseEvent<HTMLDivElement, MouseEvent>) : void => {
    event.preventDefault();
    setIsHidden(false);
  }

  return (
    <>
      {
        !isHidden ? 
          <form
            onSubmit={onAddTask}
            className="task-input-wrapper h-10 flex-col h-auto flexitems-center backdrop-blur-md bg-white/30 rounded-xl drop-shadow-lg mr-8 p-2.5 w-2/4"
          >
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
        <TaskInputFormButton
         onShowForm = { onShowForm }
        />
      }
    </>
  )
}

const TaskInputFormButton : React.FC<ITaskInputFormButtonProps> = ({onShowForm}) => {
  return (
    <div 
      className='cursor-pointer w-10 h-10 rounded-lg border border-white flex items-center justify-center mr-5'
      onClick={(event) => onShowForm(event)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </div>
  )
}