import React from 'react'

class TodoForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            'project': '',
            'title': '',
            'user': '',
            'is_active': ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

//    handleUsersSelect(event) {
//        if (!event.target.selectedOptions) {
//            this.setState({
//                'users': []
//            })
//            return;
//            }
//
//        let users = []
//
//        for(let option of event.target.selectedOptions) {
//            users.push(option.value)
//        }
//        this.setState({
//            'users': users
//            })
//    }

    handleProjectsSelect(event) {
       if (!event.target.selectedOptions) {
            this.setState({
                'projects': []
            })
            return;
            }

        let projects = []

        for(let option of event.target.selectedOptions) {
            projects.push(option.value)
        }
        this.setState({
            'projects': projects
            })
    }


    handleSubmit(event) {
        this.props.createProject(this.state.project, this.state.title, this.state.user, this.state.is_active)
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <select onChange={(event) => this.handleProjectsSelect(event)}>
                        {this.props.projects.map((project) => <option value={project.id}>{project.name}</option> )}
                    </select>
                    <input type="text" name="title" placeholder="title" value={this.state.title} onChange={(event) => this.handleChange(event)} />
                    <input type="text" name="user" placeholder="user" value={this.state.user} onChange={(event) => this.handleChange(event)} />
                    <input type="checkbox" name="is_active" placeholder="is_active" value={this.is_active} onChange={(event) => this.handleChange(event)} />
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }
}

export default TodoForm;