import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/User.js';
import Menu from './components/menu.js';
import Footer from './components/footer.js';
import TodoList from './components/Todo.js';
import ProjectList from './components/Project.js';
import LoginForm from './components/Auth.js';
import ProjectFilteredList from './components/ProjectFilter.js';
import ProjectForm from './components/ProjectForm.js';
import TodoForm from './components/TodoForm.js';
import axios from 'axios';
import {BrowserRouter, Route,Link,Switch,Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie'

const NotFound404 = ({location})=>{
    return(
        <div>
            <h1> Page by adress '{location.pathname}' not found! </h1>
        </div>
    )
}
const HiUser = ({user})=>{
    return(
        <div>
            <h1> Hi, {user}!! </h1>
        </div>
    )
}


class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            'users':[],
            'menus':[],
            'footer_links':[],
            'todos':[],
            'projects':[],
            'token': '',
            'user':''
        }
    }

    set_token(token,username){
        const cookies = new Cookies()
        cookies.set('token',token)
        cookies.set('user',username)
        this.setState({'token':token , 'user':username} , ()=> this.load_data())
    }

    is_authenticated(){
        return this.state.token != ''
    }

    logout(){
        this.set_token('','')
    }

    get_token_from_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('user')
        this.setState({'token':token,'user':username}  , ()=> this.load_data())
    }

    get_token(username,password){
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response=>{
            this.set_token(response.data['token'], username)
        }).catch(error=>alert('Incorrect login or password!!'))

    }

    get_headers(){
        let headers = {
            'Content-Type' : 'application/json;odata=verbose'
        }
        if (this.is_authenticated()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    delete_todo(uid){
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todo/${uid}/`, {headers} )
        .then(response => {
            this.setState({todos: this.state.todos.filter((item)=>item.uid !==uid)})
        }).catch(error => console.log(error))
    }

    delete_project(uid){
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${uid}/`, {headers} )
        .then(response => {
            this.setState({projects: this.state.projects.filter((item)=>item.uid !==uid)})
        }).catch(error => console.log(error))
    }

    create_project(name,repo_link,user){
        const headers = this.get_headers()
        const data = {"name": name, "repo_link":repo_link,"user":[user]}
        axios.post('http://127.0.0.1:8000/api/projects/',data, {headers})
        .then(response => {
            let new_project = response.data
            const user = this.state.users.filter((item)=> item.uid===new_project.user)[0]
            new_project.user = user
            this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error=>console.log(error))
        }

    create_todo(project,note,created_by){
        const headers = this.get_headers()
        const data = {"project": project, "note":note,"created_by":created_by}
        axios.post('http://127.0.0.1:8000/api/todo/',data, {headers})
        .then(response => {
            let new_todo = response.data
            const created_by = this.state.users.filter((item)=> item.uid===new_todo.user)[0]
            const project = this.state.projects.filter((item)=> item.uid===new_todo.project)[0]
            new_todo.created_by = created_by
            this.setState({todos: [...this.state.todos, new_todo]})
        }).catch(error=>console.log(error))
        }



    load_data(){
            const headers = this.get_headers()
            axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results;
                this.setState(
                    {
                        'users':users
                    }
                )
            }).catch(error => {console.log(error)
                    this.setState({'users':[]})
            })

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
            .then(response => {
                const todos = response.data.results;
                this.setState(
                    {
                        'todos':todos
                    }
                )
            }).catch(error => {console.log(error)
                    this.setState({'todos':[]})
            })

        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data.results;
                this.setState(
                    {
                        'projects':projects
                    }
                )
            }).catch(error => {console.log(error)
                    this.setState({'projects':[]})
            })


            const menus = [
                        {
                            'name': 'Home'
                        },
                        {
                            'name': 'Contact'
                        },
                        {
                            'name': 'Api'
                        }
            ]
            const footer_links = [
                {
                    'name':'Adress'
                },
                {
                    'name': 'Work with us'
                },
                {
                    'name':'More projects'
                }
            ]
            this.setState(
                    {
                        'menus': menus,
                        'footer_links':footer_links
                    }
                )


    }

    componentDidMount(){
        this.get_token_from_storage()
    }

    render(){
        return(
            <div className='App'>
                {this.is_authenticated() ? <HiUser user = {this.state.user} /> : <h1>Hi gost!! </h1>}
                <div>
                    <Menu menus = {this.state.menus} />
                </div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'> Todos </Link>
                            </li>
                            <li>
                                <Link to='/projects'> Projects </Link>
                            </li>
                            <li>
                                <Link to='/users'> Users </Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button>
                                :<Link to='/login'> Login </Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={()=> <TodoList todos = {this.state.todos} delete_todo={(uid)=>this.delete_todo(uid)}/> } />
                        <Route exact path='/projects' component={()=> <ProjectList projects = {this.state.projects} delete_project={(uid)=>this.delete_project(uid)}/> } />
                        <Route path='/projects/:uid'>
                            <ProjectFilteredList projects = {this.state.projects} />
                        </Route>
                        <Route exact path='/project/create' component={()=> <ProjectForm users={this.state.users}
                        create_project={(name,repo_link,user)=>this.create_project(name,repo_link,user)}/> } />
                        <Route exact path='/todo/create' component={()=> <TodoForm users={this.state.users} projects={this.state.projects}
                        create_todo={(project,note,created_by)=>this.create_todo(project,note,created_by)}/> } />
                        <Route exact path='/users' component={()=> <UserList users = {this.state.users} /> } />
                        <Route exact path='/login' component={()=> <LoginForm get_token={(username,password)=>
                                                                            this.get_token(username,password)}/> } />
                        <Redirect from='/todos' to='/' />
                        <Route  component={NotFound404} />
                    </Switch>
                </BrowserRouter>
                <div>
                    <Footer footer_links = {this.state.footer_links} />
                </div>
            </div>
        )
    }
}

export default App;
