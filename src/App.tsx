import { clickOptions } from '@testing-library/user-event/dist/click'
import Task from './Task'
import { useState, useEffect } from 'react'

interface INote {
  _id: string,
  note: string,
  completed: boolean
}

function App() {

  const [tasks, setTasks] = useState<INote[]>([])
  const [currentTask, setCurrentTask] = useState({
    note: "",
    completed: false
  })

  // getting all Notes from the server
  async function getTodoData() {
    const result = await fetch('http://localhost:8000/')
    const data = await result.json()
    // data.map( (el: any) => el._id = el._id.toString() )
    // console.log(`${typeof(data[0]._id)} after`) 
    setTasks(data)
  }

  useEffect(() => {
    getTodoData()
  }, [tasks])

//  create new note for todo app
  async function sendTodoData() {
    const result = await fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify(currentTask),
      headers: {
        "Content-type": "application/json"
      }
    })
  }
    function getTask(e: React.ChangeEvent<HTMLInputElement>) {
      setCurrentTask({
        note: e.target.value,
        completed: true
      })
    }
    
    function addTask(){
      if (document.querySelector<HTMLInputElement>('#add-task-id')?.value === "") {
        alert("Note is empty")
      }
      else {
        sendTodoData()
        // document.querySelector<HTMLInputElement>('#add-task-id')?.value = "";
      }
    }

    // deleting note from the server

    async function deleteTodoData(id: string) {
      const result = await fetch(`http://localhost:8000/${id}`, {
        method: 'DELETE'
      })
    }

    function deleteNote(id: string) {
      deleteTodoData(id)
    }

    return (
      <div className="main-todo-container">

        <div className="todo-input">
          <label className="add-task-label" htmlFor="add-task-id">
            Enter Task
          </label>

          <input type="text"
            id="add-task-id"
            name="add-task"
            placeholder="enter you task here.."
            onChange={getTask}
            size={25}
          >
          </input>

          <button className="todo-input-button" onClick={addTask}><div id="todo-input-button-add">Add</div>&nbsp;&nbsp;<div id="todo-input-button-task">Task</div></button>
        </div>

        <Task
          tasks={tasks}
          toggleClick={deleteNote}
        />


      </div >
    );
  }

  export default App;
