import React from 'react';

const TodoItem = ({todo}) => {
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
        </tr>
    )
}

const TodoList = ({todos}) => {
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
            {todos.map((todo)=> <TodoItem todo = {todo} />)}
        </table>
    )
}
export default TodoList
