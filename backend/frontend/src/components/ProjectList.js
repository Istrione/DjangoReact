const ProjectItem = ({project, deleteProject}) => {
    return(
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.url}
            </td>
            <td>
                {project.user}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return(
        <table>
            <th>
                Name
            </th>
            <th>
                URL
            </th>
            <th>
                User
            </th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
    )
}

export default ProjectList