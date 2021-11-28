import * as React from "react";
import {useEffect, useState} from "react";
import {
    AutocompleteArrayInput,
    ChipField,
    Create,
    Datagrid,
    Edit,
    List,
    SimpleForm,
    TextField,
    TextInput,
    useEditController,
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
                <TextField source="fields" label="Display fields"/>
                {/*<SingleFieldList label="fields">*/}
                {/*<ArrayChipField source="fields"/>*/}
                {/*<TextField source="fields"/>*/}
                {/*<SingleFieldList label="fields">*/}
                {/*<ArrayChipField source="fields"/>*/}
                {/*</SingleFieldList>*/}
                <TextField source="notCheckFields"/>
                {/*<TextField source="urlInfo.serviceName"/>*/}
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
export const ApiInfoEdit = props => {
    const controllerProps = useEditController(props);

    const {
        basePath, // deduced from the location, useful for action buttons
        defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
        error,  // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onFailure` side effect.
        loaded, // boolean that is false until the record is available
        loading, // boolean that is true on mount, and false once the record was fetched
        record, // record fetched via dataProvider.getOne() based on the id from the location
        redirect, // the default redirection route. Defaults to 'list'
        resource, // the resource name, deduced from the location. e.g. 'posts'
        save, // the update callback, to be passed to the underlying form as submit handler
        saving, // boolean that becomes true when the dataProvider is called to update the record
        version, // integer used by the refresh feature
    } = controllerProps;

    const [fields, setFields] = useState(() => {
        const choiceMap = controllerProps.record.fields.map((choice) => {
            let jsonMap = new Object();
            jsonMap.name = choice;
            jsonMap.id = choice;
            return jsonMap;
        });
        console.log("choiceMap : ", choiceMap);
        return choiceMap;
    });

    const [notCheckFields, setNotCheckFields] = useState(() => {
        const choiceMap = controllerProps.record.notCheckFields.map((choice) => {
            let jsonMap = new Object();
            jsonMap.name = choice;
            jsonMap.id = choice;
            return jsonMap;
        });
        return choiceMap;
    });

    const addFields = (input) => {
        const newChoice = {id: input, name: input};
        console.log("new Choice : ", newChoice);
        const copyFields = fields;
        copyFields.push(newChoice);
        setFields(copyFields);
        console.log("added choice : ", fields);
        return newChoice;
    }
    const addNotCheckFields = (input) => {
        const newChoice = {id: input, name: input};
        console.log("new Choice : ", newChoice);
        const copyNotCheckFields = notCheckFields;
        copyNotCheckFields.push(newChoice);
        setNotCheckFields(copyNotCheckFields);
        console.log("added choice : ", notCheckFields);
        return newChoice;
    }


    return (

        <Edit title={<PostTitle/>} {...props}>
            <SimpleForm>
                <TextInput disabled source="id"/>
                <TextInput source="collection"/>
                {/*<SelectInput source="collection" allowEmpty choices={collectionChoice}/>*/}
                <TextInput source="displayName"/>
                {/*<TextInput source="fields" label="Display fields"/>*/}
                <AutocompleteArrayInput source="fields"
                                        label="Display fields"
                                        onCreate={(input) => {
                                            console.log(input);
                                            return addFields(input);
                                        }}
                                        choices={fields}
                />
                <AutocompleteArrayInput source="notCheckFields"
                                        label="not check fields"
                                        onCreate={(input) => {
                                            console.log(input);
                                            return addNotCheckFields(input);
                                        }}
                                        choices={notCheckFields}
                />
                {/*<TextInput source="notCheckFields" label="not check fields"/>*/}
                <TextInput source="urlInfo.serviceName" label="Service name" defaultValue=""/>
                <TextInput source="urlInfo.getAPI" label="Get api path"/>
                <TextInput source="urlInfo.getByIdAPI" label="Get by Id path"/>
                <TextInput source="urlInfo.postAPI" label="Post api path"/>
                <TextInput source="urlInfo.deleteAPI" label="Delete api path"/>
                <TextInput source="urlInfo.putAPI" label="Put api path"/>
            </SimpleForm>
        </Edit>
    )
};

export const ApiInfoCreate = props => {
    const [fields, setFields] = useState([{id: "", name: ""}]);
    const [notCheckFields, setNotCheckFields] = useState([{id: "", name: ""}])

    const addFields = (input) => {
        const newChoice = {id: input, name: input};
        console.log("new Choice : ", newChoice);
        const copyFields = fields;
        copyFields.push(newChoice);
        setFields(copyFields);
        console.log("added choice : ", fields);
        return newChoice;
    }
    const addNotCheckFields = (input) => {
        const newChoice = {id: input, name: input};
        console.log("new Choice : ", newChoice);
        const copyNotCheckFields = notCheckFields;
        copyNotCheckFields.push(newChoice);
        setNotCheckFields(copyNotCheckFields);
        console.log("added choice : ", notCheckFields);
        return newChoice;
    }


    return (
        <Create {...props}>
            <SimpleForm>
                {/*<TextInput disabled source="id"/>*/}
                <TextInput source="collection"/>
                <TextInput source="displayName"/>
                {/*<TextInput source="fields" label="Display fields"/>*/}
                <AutocompleteArrayInput source="fields"
                                        label="Display fields"
                                        choices={fields}
                                        onCreate={(input) => {
                                            return addFields(input);
                                        }}
                />

                <AutocompleteArrayInput source="notCheckFields"
                                        label="not check fields"
                                        onCreate={(input) => {
                                            return addNotCheckFields(input);
                                        }}
                                        choices={notCheckFields}
                />
                {/*<TextInput source="notCheckFields" label="not check fields"/>*/}
                <TextInput source="urlInfo.serviceName" label="Service name" defaultValue=""/>
                <TextInput source="urlInfo.getAPI" label="Get api path"/>
                <TextInput source="urlInfo.getByIdAPI" label="Get by Id path"/>
                <TextInput source="urlInfo.postAPI" label="Post api path"/>
                <TextInput source="urlInfo.deleteAPI" label="Delete api path"/>
                <TextInput source="urlInfo.putAPI" label="Put api path"/>
            </SimpleForm>
        </Create>
    )
};

