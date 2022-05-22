import React from 'react';
import{Link} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return(
        <tr>
            <td>
                <Link to={`projects/${project.uid}`}> To project </Link>
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

const ProjectList = ({projects}) => {

    return(
        <table>
            <th>
                Project Link
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
            {projects.map((project)=> <ProjectItem project = {project} />)}
        </table>
    )
}
export default ProjectList
