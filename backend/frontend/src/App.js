import React from 'react'
import axios from 'axios'
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import LoginForm from './components/LoginForm.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'redirect': false
        }
    }

    deleteProject(projectId) {
        let headers = this.getHeaders()

        axios
            .delete(`http://localhost:8000/api/projects/${projectId}`,  {headers})
            .then(response => {
                this.setState({
               'projects': this.state.projects.filter((project) => project.id != projectId)
            })
            .catch(error => {
                console.log(error)
            })
    }

    createProject(name, url, users) {
        let headers = this.getHeaders()

        axios
            .post('http://localhost:8000/api/projects/', {'name': name, 'url': url, 'users': users}, {headers})
            .then(response => {
                this.setState({
               'redirect': '/projects'
            }, this.getData)
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteTodo(todoId) {
        let headers = this.getHeaders()

        axios
            .delete(`http://localhost:8000/api/projects/${todoId}`,  {headers})
            .then(response => {
                this.setState({
               'todos': this.state.todos.filter((todo) => todo.is_active != true)
            })
            .catch(error => {
                console.log(error)
            })
    }

    createTodo(project, title, user, is_active) {
        let headers = this.getHeaders()

        axios
            .post('http://localhost:8000/api/todos/', {'project': project, 'title': title, 'user': user, 'is_active': is_active}, {headers})
            .then(response => {
                this.setState({
               'redirect': '/todos'
            }, this.getData)
            })
            .catch(error => {
                console.log(error)
            })
    }

    obtainAuthToken(login, password) {
         axios
            .post('http://localhost:8000/api-auth-token/', {
                'username': login,
                'password': password
            })
            .then(response => {
                const token = response.data.token
                localStorage.setItem('token', token)
                this.setState(
                    {
                    'token': token
                    },
                    this.getData
                )
            })
            .catch(error => console.log(error))
    }

    isAuth() {
        return !!this.state.token
    }

    componentDidMount(){
        let token = localStorage.getItem('token')
        this.setState(
                    {
                    'token': token
                    },
                    this.getData
                )
    }

    getHeaders() {
        if (this.isAuth()) {
            return {
                'Authorization' : 'Token ' + this.state.token
            }
        }
        return {}
    }

    getData() {

        this.setState({
            'redirect': false
        })
        let headers = this.getHeaders()

        axios
            .get('http://localhost:8000/api/users/', {headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                    'users': users
                    }
                )
            })
            .catch(error => {
                this.setState({'users': [] })
                console.log(error)
            })
        axios
            .get('http://localhost:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                    'projects': projects
                    }
                )
            })
            .catch(error => {
                this.setState({'projects': [] })
                console.log(error)
            })
        axios
            .get('http://localhost:8000/api/todos/', {headers})
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                    'todos': todos
                    }
                )
            })
            .catch(error => {
                this.setState({'todos': [] })
                console.log(error)
            })
    }

    logOut() {
        localStorage.setItem('token', '')
        this.setState({
            'token': '',
            'redirect': '/'
        }, this.getData)
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    {this.state.redirect ? <Navigate to={this.state.redirect} /> :<div/>}
                    <nav>
                    <li> <Link to='/'>Users</Link> </li>
                    <li> <Link to='/projects'>Projects</Link> </li>
                    <li> <Link to='/create_project'>Create project</Link> </li>
                    <li> <Link to='/todos'>Todos</Link> </li>
                    <li> <Link to='/create_todo'>Create todo</Link> </li>
                    <li>
                    {this.isAuth() ? <button onClick={() => this.logOut()}>Logout</button>:  <Link to='/login'>Login</Link> }
                    </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(projectId) => this.deleteProject(projectId)/>} />
                        <Route exact path='/create_project' element={<ProjectForm users={this.state.users} createProject={(name, url, users) => this.createProject(name, url, users)}/>} />
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos} />} />
                        <Route exact path='/create_todo' element={<TodoForm projects={this.state.projects} } />} />
                        <Route exact path='/login' element={<LoginForm obtainAuthToken={(login, password) =>  this.obtainAuthToken(login, password)} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
