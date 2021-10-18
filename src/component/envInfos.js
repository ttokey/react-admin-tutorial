import * as React from "react";
import {Create, Datagrid, Edit, List, SimpleForm, TextField, TextInput} from 'react-admin';


export const envInfoList = props => (
    <List {...props} filters={envInfoFilter}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="env"/>
            <TextField source="url"/>
            <TextField source="user"/>
        </Datagrid>
    </List>
);

const envInfoFilter = [
    <TextInput source="id" label="id" alwaysOn/>,
    <TextInput source="env" label="env" alwaysOn/>,
    <TextInput source="url" label="url" alwaysOn/>,
];


export const envInfoCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="env"/>
            <TextInput source="url"/>
        </SimpleForm>
    </Create>
);

const PostTitle = ({record}) => {
    return <span>EnvInfo {record ? `"${record.env}"` : ''}</span>;
};

export const envInfoEdit = props => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm warnWhenUnsavedChanges>
            <TextInput disabled source="id"/>
            <TextInput source="env"/>
            <TextInput source="url"/>
        </SimpleForm>
    </Edit>
);
