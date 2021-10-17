import * as React from 'react';
import {useEffect, useState} from 'react';
import {CButton, CCol, CContainer, CRow} from "@coreui/react";
import Select from "react-select";
import {getDiffStatusList} from "../service/transferDataProvider";
import {MDBDataTableV5} from "mdbreact";


export const DiffAndTransfer = (props) => {
    const [column, setColumn] = useState([]);
    const [diffStatus, setDiffStatus] = useState([]);
    const [collection, setCollection] = useState('');
    const [sourceEnv, setSourceEnv] = useState('');
    const [targetEnv, setTargetEnv] = useState('');
    const [checkbox1, setCheckbox1] = useState([]);
    const [data, setData] = useState({});

    const handleSelect = (value, setFunction) => {
        setFunction(value.realValue);
    };

    useEffect(() => {
            console.log("collection : {}, sourceEnv : {}, targetEnv : {}", collection, sourceEnv, targetEnv)
        },
        [collection, sourceEnv, targetEnv]
    )

    useEffect(() => {
            console.log("diffStatus : ", diffStatus);
            setData({
                    columns: [
                        {
                            label: 'id',
                            field: 'id',
                            sort: 'asc',
                            width: 200,
                            attributes: {
                                'aria-controls': 'DataTable',
                                'aria-label': 'Name',
                            },
                        },
                        {
                            label: 'nluId',
                            field: 'fields.nluId',
                            sort: 'asc',
                            width: 200
                        },
                        {
                            label: 'confidenceCutScore',
                            field: 'fields.confidenceCutScore',
                            sort: 'asc',
                            width: 200
                        },
                        {
                            label: 'url',
                            field: 'status',
                            sort: 'asc',
                            width: 200
                        },
                    ],
                    rows: diffStatus
                }
            );
        }, [diffStatus]
    )

    useEffect(() => {
            console.log("data : ", data);
        },
        [data]
    )

    const getDiffStatus = async () => {
        const response = await getDiffStatusList(collection, sourceEnv, targetEnv);
        console.log(response);
        setDiffStatus(response);
    };

    const showLogs2 = (e) => {
        setCheckbox1(e);
    };

    return (
        <CContainer>
            <CRow>
                <CCol md={2}>
                    <div>collection</div>
                    <Select
                        onChange={(e) => handleSelect(e, setCollection)}
                        options={collectionOption}
                    />

                </CCol>
                <CCol md={2}>
                    <div>source</div>
                    <Select
                        onChange={(value) => handleSelect(value, setSourceEnv)}
                        options={envOption}
                    />
                </CCol>
                <CCol md={2}>
                    <div>target</div>
                    <Select
                        onChange={(value) => handleSelect(value, setTargetEnv)}
                        options={envOption}
                    />
                </CCol>
                <CCol md={2}>
                    <CButton color="secondary" onClick={getDiffStatus}>diff status</CButton>
                </CCol>
            </CRow>

            <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={data}
                // checkbox
                //
                // headCheckboxID='id6'
                // bodyCheckboxID='checkboxes6'
                // getValueCheckBox={(e) => {
                //     showLogs2(e);
                // }}
                // getValueAllCheckBoxes={(e) => {
                //     showLogs2(e);
                // }}
                // multipleCheckboxes
            />
        </CContainer>
    );
}


const collectionOption = [
    {value: 'nlu', label: 'nlu', realValue: 'nlu'},
    {value: 'view', label: 'view', realValue: 'view'},
    {value: 'control', label: 'control', realValue: 'control'},
];

const envOption = [
    {value: "local", label: "local", realValue: "local"},
    {value: "local2", label: "local2", realValue: "local2"},
    {value: "dev", label: "dev", realValue: "dev"},
    {value: "test", label: "test", realValue: "test"},
    {value: "prod", label: "prod", realValue: "prod"},
];

