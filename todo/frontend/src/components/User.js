import React from 'react';

const UserItem = ({user}) => {
    return(
        <tr>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.user_name}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.birthday_year}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return(
        <table>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                Username
            </th>
            <th>
                Email
            </th>
            <th>
                Birthday
            </th>
            {users.map((user)=> <UserItem user = {user} />)}
        </table>
    )
}
export default UserList