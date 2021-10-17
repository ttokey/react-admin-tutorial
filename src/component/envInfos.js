import * as React from "react";
import {Datagrid, Edit, List, SimpleForm, TextField, TextInput} from 'react-admin';

export const envInfoList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="env"/>
            <TextField source="url"/>
            <TextField source="user"/>
        </Datagrid>
    </List>
);

const PostTitle = ({record}) => {
    return <span>EnvInfo {record ? `"${record.env}"` : ''}</span>;
};

export const envInfoEdit = props => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="env"/>
            <TextInput source="url"/>
        </SimpleForm>
    </Edit>
);

