import * as React from 'react';
import {Component} from 'react';
import {Datagrid, Edit, EditButton, List, SelectField, SimpleForm, TextField, TextInput,} from 'react-admin';
import {
    CCol,
    CContainer,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import Select from "react-select";

class DiffAndTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSource: "dev",
            selectedTarget: "dev"

        }
    };

    handleSourceChange = (value) => {
        this.setState({selectedSource: value.value}, () =>
            console.log(`selectedSource : `, this.state.selectedSource, this.state.selectedTarget)
        );
    };

    handleTargetChange = (value) => {
        this.setState({selectedTarget: value.value}, () =>
            console.log(`selectedSource : `, this.state.selectedSource, this.state.selectedTarget)
        );
    };


    render() {
        return (
            <div>
                <CContainer>
                    <CRow xs={{gutter: 2}}>
                        <CCol xs={{span: 6}}>
                            <div>source</div>
                        </CCol>
                        <CCol xs={{span: 6}}>
                            <Select
                                onChange={this.handleSourceChange}
                                options={options}/>
                        </CCol>
                        <CCol xs={{span: 6}}>
                            <div>target</div>
                        </CCol>
                        <CCol xs={{span: 6}}>
                            <Select
                                onChange={this.handleTargetChange}
                                options={options}/>
                        </CCol>
                        <CCol xs={{span: 6}}>
                            <button>DiffStatus</button>
                        </CCol>
                    </CRow>
                </CContainer>

                <CTable bordered>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">haha</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableHeaderCell scope="row">1</CTableHeaderCell>
                            <CTableDataCell>Mark</CTableDataCell>
                            <CTableDataCell>Otto</CTableDataCell>
                            <CTableDataCell>@mdo</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell scope="row">2</CTableHeaderCell>
                            <CTableDataCell>Jacob</CTableDataCell>
                            <CTableDataCell>Thornton</CTableDataCell>
                            <CTableDataCell>@fat</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell scope="row">3</CTableHeaderCell>
                            <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
                            <CTableDataCell>@twitter</CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </div>
        );
    }
}

const options = [
    {value: "dev", label: "dev"},
    {value: "test", label: "test"},
    {value: "prod", label: "prod"},
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
                    <SelectField source="gender" choices={[
                        {id: 'M', name: 'Male'},
                        {id: 'F', name: 'Female'},
                    ]}/>
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
