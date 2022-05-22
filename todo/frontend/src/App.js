import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/User.js';
import Menu from './components/menu.js';
import Footer from './components/footer.js';
import TodoList from './components/Todo.js';
import ProjectList from './components/Project.js';
import ProjectFilteredList from './components/ProjectFilter.js';
import axios from 'axios';
import {BrowserRouter, Route,Link,Switch,Redirect} from 'react-router-dom';

const NotFound404 = ({location})=>{
    return(
        <div>
            <h1> Page by adress '{location.pathname}' not found! </h1>
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
            'projects':[]
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results;
                this.setState(
                    {
                        'users':users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todos = response.data.results;
                this.setState(
                    {
                        'todos':todos
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results;
                this.setState(
                    {
                        'projects':projects
                    }
                )
            }).catch(error => console.log(error))


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

    render(){
        return(
            <div className='App'>
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
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={()=> <TodoList todos = {this.state.todos} /> } />
                        <Route exact path='/projects' component={()=> <ProjectList projects = {this.state.projects} /> } />
                        <Route path='/projects/:uid'>
                            <ProjectFilteredList projects = {this.state.projects} />
                        </Route>
                        <Route exact path='/users' component={()=> <UserList users = {this.state.users} /> } />
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
