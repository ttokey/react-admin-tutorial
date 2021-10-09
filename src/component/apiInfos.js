import * as React from "react";
import {AutocompleteArrayInput, Datagrid, Edit, List, SelectInput, SimpleForm, TextField, TextInput} from 'react-admin';

export const apiInfoList = props => (
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

const PostTitle = ({record}) => {
    return <span>ApiInfo {record ? `"${record.displayName}"` : ''}</span>;
};

const collectionChoice = [
    {id: 'nlu', name: 'nlu'},
    {id: 'eaiSchema', name: 'eaiSchema'},
    {id: 'responseView', name: 'responseView'},
    {id: 'responseControl', name: 'responseControl'},
    {id: 'scriptInfo', name: 'scriptInfo'},
    {id: 'restInfo', name: 'restInfo'},
];

const fieldChoice = [
    {id: 'nluId', name: 'nluId'},
    {id: 'confidenceCutScore', name: 'confidenceCutScore'},
];

//TODO::
const notCheckFieldChoice = [
    {id: 'lastModUser', name: 'lastModUser'},
    {id: 'lastModDate', name: 'lastModDate'},
];

// TODO:: create 할 때 자동으로 추가할 수 있도록 하면 좋을 듯
export const apiInfoEdit = props => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            {/*<TextInput source="collection"/>*/}
            <SelectInput source="collection" allowEmpty choices={collectionChoice}/>
            <TextInput source="displayName"/>
            <AutocompleteArrayInput source="fields" create choices={fieldChoice}/>
            <AutocompleteArrayInput source="notCheckFields" choices={notCheckFieldChoice}/>
            <TextInput source="urlInfo"/>
            <TextInput source="urlInfo.serviceName"/>
            <TextInput source="urlInfo.getAPI"/>
            <TextInput source="urlInfo.getByIdAPI"/>
            <TextInput source="urlInfo.postAPI"/>
            <TextInput source="urlInfo.deleteAPI"/>
            <TextInput source="urlInfo.putAPI"/>
            <TextInput multiline source="body"/>
        </SimpleForm>
    </Edit>
);