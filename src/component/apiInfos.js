import * as React from "react";
import {useEffect} from "react";
import {
    ChipField,
    Datagrid,
    Edit,
    List,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    useRecordContext,
} from 'react-admin';

export const ApiInfoList = (props) => {
    useEffect(() => {
            const pro = {...props};
            console.log(pro);
            console.log(pro.children)
            console.log(props.basePath);
        },
        []
    )
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <TextField source="collection"/>
                <TextField source="displayName"/>
                <TextField source="urlInfo.serviceName" label="Service Name"/>
                <TextField source="fields"/>
                {/*<SingleFieldList label="fields">*/}
                {/*<ArrayChipField source="fields"/>*/}
                {/*</SingleFieldList>*/}
                <TextField source="notCheckFields"/>
            </Datagrid>
        </List>
    );
}

const ArrayChipField = (props) => {
    const record = useRecordContext(props);
    console.log("record : ", record);

    const recordOutput = record.fields.map((field, index) => {
        console.log("field, index : ", field, index);
        return (<ChipField> {field} </ChipField>);
    });

    console.log("recordOutput : ", recordOutput);
    return (
        recordOutput
    );
}


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
export const ApiInfoEdit = props => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="collection"/>
            <SelectInput source="collection" allowEmpty choices={collectionChoice}/>
            <TextInput source="displayName"/>
            <TextInput source="fields"/>
            <TextInput source="notCheckFields"/>
            {/*<AutocompleteArrayInput source="fields" create choices={fieldChoice}/>*/}
            {/*<AutocompleteArrayInput source="notCheckFields" choices={notCheckFieldChoice}/>*/}
            <TextInput source="urlInfo.serviceName"/>
            <TextInput source="urlInfo.getAPI"/>
            <TextInput source="urlInfo.getByIdAPI"/>
            <TextInput source="urlInfo.postAPI"/>
            <TextInput source="urlInfo.deleteAPI"/>
            <TextInput source="urlInfo.putAPI"/>
        </SimpleForm>
    </Edit>
);