const TodoItem = ({todo}) => {
    return(
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.title}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.is_active}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return(
        <table>
            <th>
                Project
            </th>
            <th>
                Title
            </th>
            <th>
                User
            </th>
            <th>
                Active
            </th>
            {todos.map((todo) => <TodoItem todo={todo}/>)}
        </table>
    )
}

export default TodoList