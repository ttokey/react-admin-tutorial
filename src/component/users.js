import * as React from "react";
import {Datagrid, EmailField, List, TextField} from 'react-admin';
import MyUrlField from "./MyUrlField";

export const UserList = props => (
    <div>
        <textarea label={"source"}></textarea>
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <TextField source="name"/>
                <TextField source="username"/>
                <EmailField source="email"/>
                <TextField source="address.street"/>
                <TextField source="phone"/>
                <MyUrlField source="website"/>
                <TextField source="company.name"/>
            </Datagrid>
        </List>
    </div>
);