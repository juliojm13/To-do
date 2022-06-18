import React from 'react';
import{Link} from 'react-router-dom'

const TodoItem = ({todo,delete_todo}) => {
    return(
        <tr>
            <td>
                {todo.project.name}
            </td>
            <td>
                {todo.note}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.created_by.first_name}
            </td>
            <td><button onClick={()=>delete_todo(todo.uid)} type='button' >Delete</button></td>
        </tr>
    )
}

const TodoList = ({todos,delete_todo}) => {
    return(
        <table>
            <th>
                Project name
            </th>
            <th>
                Note
            </th>
            <th>
                Created
            </th>
            <th>
                Created by
            </th>
            {todos.map((todo)=> <TodoItem todo = {todo} delete_todo={delete_todo} />)}
        <Link to={'todo/create'}> Create to do </Link>
        </table>
    )
}
export default TodoList
