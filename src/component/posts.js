import * as React from "react";
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    List,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';

const PostTitle = ({record}) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn/>,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
        <SelectInput optionText="name"/>
    </ReferenceInput>
];


export const PostList = props => {
    return (
        <List filters={postFilters} {...props}>
            <Datagrid>
                <TextField source="id"/>
                <ReferenceField label="User" source="userId" reference="users">
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="title"/>
                <TextField source="body"/>
                <EditButton/>
            </Datagrid>
        </List>
    );
};

export const PostEdit = props => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput source="userId" reference="users">
                {/*<SelectInput optionText="id"/>*/}
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <TextInput multiline source="body"/>
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                < SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <TextInput multiline source="body"/>
        </SimpleForm>
    </Create>


)