import React from 'react';
import{Link, useParams} from 'react-router-dom'

const ProjectFilteredItem = ({project}) => {
    return(
        <tr>
            <td>
                {project.uid}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo_link}
            </td>
            <td>
                {project.user.map((x)=> ` ${x.user_name} `)}
            </td>
        </tr>
    )
}

const ProjectFilteredList = ({projects}) => {
    let { uid } = useParams();
    let filtered_projects = projects.filter((project)=>project.uid == uid)

    return(
        <table>
            <th>
                Project ID
            </th>
            <th>
                Name
            </th>
            <th>
                Repo
            </th>
            <th>
                Users
            </th>
            {filtered_projects.map((project)=> <ProjectFilteredItem project = {project} />)}
        </table>
    )
}
export default ProjectFilteredList
