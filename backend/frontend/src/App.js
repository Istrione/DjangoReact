import React from 'react'
import axios from 'axios'
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import LoginForm from './components/LoginForm.js'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
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
        }, this.getData)
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                    <li> <Link to='/'>Users</Link> </li>
                    <li> <Link to='/projects'>Projects</Link> </li>
                    <li> <Link to='/todos'>Todos</Link> </li>
                    <li>
                    {this.isAuth() ? <button onClick={() => this.logOut()}>Logout</button>:  <Link to='/login'>Login</Link> }
                    </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos} />} />
                        <Route exact path='/login' element={<LoginForm obtainAuthToken={(login, password) =>  this.obtainAuthToken(login, password)} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
