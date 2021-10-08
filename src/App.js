import './App.css';
import React from 'react';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {UserList} from "./component/users";
import {PostCreate, PostEdit, PostList} from "./component/posts";
import UserIcon from '@material-ui/icons/Group';
import PostIcon from '@material-ui/icons/Book';
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const envInfoProvider = jsonServerProvider('http://localhost:1234');

const App = () => (
    <Admin dataProvider={dataProvider} dashboard={Dashboard} authProvider={authProvider}>
        <Resource name="users" list={UserList} icon={UserIcon}/>
        <Resource name="posts" list={PostList} icon={PostIcon} edit={PostEdit} create={PostCreate}/>
        {/*{<Resource name="envInfo" list={envInfos}/>}*/}
    </Admin>

);

export default App;

