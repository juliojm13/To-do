import React from 'react'

class ProjectForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            repo_link: '',
            user: props.users[0]?.uid
        }
    }

    handleChange(event){
    this.setState(
        {
            [event.target.name]:event.target.value
        }
    );
    }

    handleSubmit(event){
        this.props.create_project(this.state.name,this.state.repo_link,this.state.user)
        event.preventDefault()
    }

    render(){
        return(
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <div className='form-group'>
                    <label for='name'>name</label>
                        <input type='text' className='form-control' name='name'
                        value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className='form-group'>
                    <label for='repo_link'>repo_link</label>
                        <input type='text' className='form-control' name='repo_link'
                        value={this.state.repo_link} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className='form-group'>
                    <select  name='user' className='form-control' onChange={(event)=>this.handleChange(event)} >
                        {this.props.users.map((item)=><option value={item.uid}>{item.user_name}</option>)}
                    </select>

                </div>
                <input type='submit' className='btn btn-primary' value='Save' />
            </form>
        );
    }

}

export default ProjectForm