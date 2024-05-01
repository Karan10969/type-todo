type noteType = {
   tasks: {
    _id: string,
    note: string,
    completed: boolean
  }[],
  toggleClick: (id: string) => void;
}
// type Props = {
    
//   }

export default function Task( 
    {tasks,toggleClick}:noteType
){
    if(tasks.length===0){
        return (<div><strong>No Task found</strong></div>)
    }
        const myTaskList = tasks.map(task => {
        return (
            <li key={task._id} className="todo-task">

                <div className="visible-note">
                
                <div className="note-container">
                    {task.note}
                </div>
                    
                    <button
                        title="delete note"
                        className="delete-note-button"
                        onClick={() => toggleClick(task._id)}
                    >
                        <svg className="delete-svg" xmlns="http://www.w3.org/2000/svg" height="24" fill="red" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                    </button>
                </div>

            </li>

        )
    })

    return(
        <div> {myTaskList}</div>
    )
}