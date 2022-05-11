import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/User.js';
import Menu from './components/menu.js';
import Footer from './components/footer.js';
import axios from 'axios';


class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            'users':[],
            'menus':[],
            'footer_links':[],
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data;
                this.setState(
                    {
                        'users':users
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
            <div>
                <div>
                    <Menu menus = {this.state.menus} />
                </div>
                <div>
                    <UserList users = {this.state.users} />
                </div>
                <div>
                    <Footer footer_links = {this.state.footer_links} />
                </div>
            </div>
        )
    }
}

export default App;
