const TodoItem = ({todo, deleteTodo}) => {
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
            <td>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
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
            {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
    )
}

export default TodoList