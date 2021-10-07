import './App.css';
import React from 'react';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {UserList} from "./service/users";


const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const envInfoProvider = jsonServerProvider('http://localhost:1234');

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="users" list={UserList}/>
        {/*{<Resource name="envInfo" list={envInfos}/>}*/}
    </Admin>

);

export default App;

