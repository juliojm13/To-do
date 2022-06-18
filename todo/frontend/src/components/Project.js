import React from 'react';
import{Link} from 'react-router-dom'

const ProjectItem = ({project,delete_project}) => {
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
            <td><button onClick={()=>delete_project(project.uid)} type='button' >Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects,delete_project}) => {

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
            {projects.map((project)=> <ProjectItem project = {project} delete_project={delete_project}/>)}
            <Link to={'project/create'}> Create project </Link>
        </table>
    )
}
export default ProjectList
