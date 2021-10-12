import * as React from 'react';
import {Component} from 'react';
import {Datagrid, Edit, EditButton, List, SimpleForm, TextField, TextInput,} from 'react-admin';
import Select from "react-select";

class DiffAndTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSource: "dev",

        }
    };

    handleChange = (selectedSource) => {
        this.setState({selectedSource}, () =>
            console.log(`Option selected:`, this.state.selectedSource)
        );
    };


    render() {
        return (
            <div>
                <div>source</div>
                <Select
                    options={options}
                    ohChange={this.handleChange}
                />
                <div>target</div>
                <button>DiffStatus</button>
                <MyList children={this.props}/>
            </div>
        );
    }
}

const options = [
    {value: "dev", label: "dev"},
    {value: "test", label: "test", selectedSource: "test", selectedTarget: "test"},
    {value: "prod", label: "prod", selectedSource: "prod", selectedTarget: "prod"},
]

class MyList extends Component {
    render() {
        const data = {...this.props.children};

        return (
            <List {...data} title="transfer List">
                <Datagrid>
                    <TextField source="id"/>
                    <TextField source="fields"/>
                    <TextField source="status"/>
                    <TextField source="sourceData"/>
                    <TextField source="diffData"/>
                    <EditButton/>
                </Datagrid>
            </List>
        );
    }
}

export const transferEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="collection"/>
            <TextInput source="displayName"/>
            <TextInput source="list.status"/>
            <TextInput source="list.sourceData"/>
            <TextInput source="list.targetData"/>
            <TextInput source="list.diffData"/>
        </SimpleForm>
    </Edit>
)

export default DiffAndTransfer;
