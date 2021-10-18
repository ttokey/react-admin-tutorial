import './App.css';
import React from 'react';
import {Admin, Resource} from 'react-admin';
import Dashboard from "./Dashboard";
import authProvider from "./service/authProvider";
import jsonServerProvider from 'ra-data-json-server';
import myDataProvider from "./service/myDataProvider";
import {apiInfoEdit, apiInfoList} from "./component/apiInfos";
import DiffAndTransfer, {transferEdit} from "./component/diffAndTransfer";
import {CustomEnvInfoList} from "./component/envInfos";
import {transferList} from "./component/Transfer";


// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const envInfoProvider = jsonServerProvider('http://localhost:1234');


const App = () => (
    <Admin dataProvider={myDataProvider} dashboard={Dashboard} authProvider={authProvider}>
        {/*<Resource name="users" list={UserList}/>*/}
        {/*<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}/>*/}
        <Resource name="envInfo" list={CustomEnvInfoList}/>
        <Resource name="apiInfo" list={apiInfoList} edit={apiInfoEdit}/>
        <Resource name="transfer" list={transferList}/>
        <Resource name="temp" options={{label: 'diffAndTransfer'}} list={DiffAndTransfer} edit={transferEdit}/>
    </Admin>
);

export default App;

