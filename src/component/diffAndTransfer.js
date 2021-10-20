import * as React from 'react';
import {useEffect, useState} from 'react';
import {CButton, CCol, CContainer, CRow} from "@coreui/react";
import Select from "react-select";
import {getDiff, getDiffStatusList} from "../service/transferDataProvider";
import DataTable from 'react-data-table-component'
import {DiffModal} from "./DiffModal";

export const DiffAndTransfer = (props) => {
    const [column, setColumn] = useState([]);
    const [diffStatus, setDiffStatus] = useState([]);
    const [collection, setCollection] = useState('');
    const [sourceEnv, setSourceEnv] = useState('');
    const [targetEnv, setTargetEnv] = useState('');
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [diffData, setDiffData] = useState({});

    const handleSelect = (value, setFunction) => {
        setFunction(value.realValue);
    };

    useEffect(() => {
            console.log("collection : {}, sourceEnv : {}, targetEnv : {}", collection, sourceEnv, targetEnv)
        },
        [collection, sourceEnv, targetEnv]
    )


    useEffect(() => {
            setColumn(makeColumns);
            setData(diffStatus);
            console.log("data : ", data);
            console.log("column : ", column);
        }, [diffStatus]
    )

    const makeColumns = [
        {
            name: 'id',
            selector: row => row.id,
            sortable: true,

        },
        {
            name: 'status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'nluId',
            selector: row => row.fields.nluId,
            sortable: true,
        },
        {
            name: 'confidenceCutScore',
            selector: row => row.fields.confidenceCutScore,
            sortable: true,
        },
    ];


    // data provides access to your row data
    const ExpandedComponent = ({data}) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const diffShow = async (row, event) => {
        const response = await getDiff(collection, row.id, sourceEnv, targetEnv);
        setVisible(true);
        // console.log(response);
        setDiffData(response);
    };


    const getDiffStatus = async () => {
        const response = await getDiffStatusList(collection, sourceEnv, targetEnv);
        console.log(response.list);
        setDiffStatus(response.list);
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

            <DataTable
                columns={column}
                data={data}
                selectableRows
                // expandableRows
                pagination
                onRowClicked={diffShow}
                // expandableRowsComponent={ExpandedComponent2}
            />

            <DiffModal
                visible={visible}
                setVisible={setVisible}
                response={diffData}/>
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

