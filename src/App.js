import './App.css';
import React from 'react';
import {Admin, Resource} from 'react-admin';
import Dashboard from "./Dashboard";
import authProvider from "./service/authProvider";
import jsonServerProvider from 'ra-data-json-server';
import myDataProvider from "./service/myDataProvider";
import {ApiInfoEdit, ApiInfoList} from "./component/apiInfos";
import {DiffAndTransfer} from "./component/diffAndTransfer";
import {envInfoCreate, envInfoEdit, envInfoList} from "./component/envInfos";

import 'core-js'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const envInfoProvider = jsonServerProvider('http://localhost:1234');

const App = () => {
    
    return (
        <Admin dataProvider={myDataProvider} dashboard={Dashboard} authProvider={authProvider}>
            {/*<Resource name="users" list={UserList}/>*/}
            {/*<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}/>*/}
            <Resource name="envInfo" list={envInfoList} create={envInfoCreate} edit={envInfoEdit}/>
            <Resource name="apiInfo" list={ApiInfoList} edit={ApiInfoEdit}/>
            {/*<Resource name="transfer" list={transferList}/>*/}
            <Resource name="temp" options={{label: 'diffAndTransfer'}} list={DiffAndTransfer}/>
        </Admin>
    );
};

export default App;

