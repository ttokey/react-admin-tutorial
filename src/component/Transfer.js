import * as React from "react";
import {Datagrid, List, TextField} from 'react-admin';

export const transferList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="collection"/>
            <TextField source="displayName"/>
            <TextField source="urlInfo.serviceName"/>
            <TextField source="fields"/>
            <TextField source="notCheckFields"/>
            <TextField source="date"/>
            <TextField source="user"/>
        </Datagrid>
    </List>
);
