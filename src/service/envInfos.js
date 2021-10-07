import * as React from "react";
import {Datagrid, List, TextField} from 'react-admin';

export const envInfos = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="env"/>
            <TextField source="url"/>
            {/*<TextField source="date"/>*/}
            <TextField source="user"/>
        </Datagrid>
    </List>
);