import './App.css';

import React from 'react';
import {Admin, ListGuesser, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('http://localhost:1234');

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="envInfo" list={ListGuesser}/>
    </Admin>
);

export default App;

