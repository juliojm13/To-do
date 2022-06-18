import React from 'react'

class TodoForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            project: props.projects[0]?.uid,
            note:'',
            created_by: props.users[0]?.uid
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
        this.props.create_todo(this.state.project,this.state.note,this.state.created_by)
        event.preventDefault()
    }

    render(){
        return(
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <div className='form-group'>
                    <select  name='project' className='form-control' onChange={(event)=>this.handleChange(event)} >
                        {this.props.projects.map((item)=><option value={item.uid}>{item.name}</option>)}
                    </select>

                </div>

                <div className='form-group'>
                    <label for='note'>note</label>
                        <input type='text' className='form-control' name='note'
                        value={this.state.note} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className='form-group'>
                    <select  name='created_by' className='form-control' onChange={(event)=>this.handleChange(event)} >
                        {this.props.users.map((item)=><option value={item.uid}>{item.user_name}</option>)}
                    </select>

                </div>
                <input type='submit' className='btn btn-primary' value='Save' />
            </form>
        );
    }

}

export default TodoForm