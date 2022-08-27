import React from 'react'
import axios from 'axios'
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount(){
        axios
            .get('http://localhost:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                    'users': users
                    }
                )
            })
            .catch(error => console.log(error))
        axios
            .get('http://localhost:8000/api/projects/')
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                    'projects': projects
                    }
                )
            })
            .catch(error => console.log(error))
        axios
            .get('http://localhost:8000/api/todos/')
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                    'todos': todos
                    }
                )
            })
            .catch(error => console.log(error))

    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                    <li> <Link to='/'>Users</Link> </li>
                    <li> <Link to='/projects'>Projects</Link> </li>
                    <li> <Link to='/todos'>Todos</Link> </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
