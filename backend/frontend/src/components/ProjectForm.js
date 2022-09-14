import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            'name': '',
            'url': '',
            'users': []
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUsersSelect(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users': []
            })
            return;
            }

        let users = []

        for(option of event.target.selectedOptions) {
            users.push(option.value)
        }
        this.setState({
            'users': users
            })
    }
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.url, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name="name" placeholder="name" value={this.state.name} onChange={(event) => this.handleChange(event)} />
                    <input type="text" name="url" placeholder="url" value={this.state.url} onChange={(event) => this.handleChange(event)} />
                    <select multiple onChange={(event) => this.handleUsersSelect(event)>
                        {this.props.users.map((user) => <option value={user.id}>{user.username} {user.first_name}</option> )}
                    </select>
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }
}

export default ProjectForm;