import * as React from 'react';
import {useEffect, useState} from 'react';
import {CButton, CCol, CContainer, CRow} from "@coreui/react";
import Select from "react-select";
import {getApiCollection, getDiff, getDiffStatusList, getEnvs, postTransfer} from "../service/transferDataProvider";
import DataTable from 'react-data-table-component'
import {DiffModal} from "./DiffModal";

export const DiffAndTransfer = (props) => {
    const [column, setColumn] = useState([]);
    const [diffStatus, setDiffStatus] = useState({
        list: [],
        fields: [],
        collection: "",
        displayName: "",
    });
    const [collection, setCollection] = useState('');
    const [sourceEnv, setSourceEnv] = useState('');
    const [targetEnv, setTargetEnv] = useState('');
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [diffData, setDiffData] = useState({
        id: "",
        fields: [],
        status: "",
        sourceData: "",
        targetData: "",
        diffData: "",
    });


    // const collectionOption = makeCollections();

    const [collectionOption, setCollectionOption] = useState([]);
    const [envOption, setEnvOption] = useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);

    const handleSelect = (value, setFunction) => {
        setFunction(value.realValue);
    };

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleTransfer = () => {
        if (window.confirm(`이관하시겠습니까?`)) {
            setToggleCleared(!toggleCleared);
            doTransfer(selectedRows.map(row => row.id)).then(() =>
                getDiffStatus()
            );
        }
    };


    useEffect(() => {
            console.log("collection : {}, sourceEnv : {}, targetEnv : {}", collection, sourceEnv, targetEnv)
        },
        [collection, sourceEnv, targetEnv]
    )

    useEffect(() => {
            setColumn(makeColumns);
            setData(diffStatus.list);
        }, [diffStatus]
    )

    useEffect(() => {
            makeCollections();
        }, []
    )

    const makeCollections = () => {
        getApiCollection().then((response) => {
            console.log("response get :", response)
            const collectionMap = [];
            response.map(collection => {
                let jsonMap = new Object();
                jsonMap.value = collection;
                jsonMap.label = collection;
                jsonMap.realValue = collection;
                collectionMap.push(jsonMap);
            })
            setCollectionOption(collectionMap);
        });

        getEnvs().then((response) => {
            console.log("response env get :", response)
            const collectionMap = [];
            response.map(collection => {
                let jsonMap = new Object();
                jsonMap.value = collection;
                jsonMap.label = collection;
                jsonMap.realValue = collection;
                collectionMap.push(jsonMap);
            })
            setEnvOption(collectionMap);
        });
    };


    // const collectionOption = makeCollections();

    const collectionOption2 = [
        {value: 'nlu', label: 'nlu', realValue: 'nlu'},
        {value: 'view', label: 'view', realValue: 'view'},
        {value: 'control', label: 'control', realValue: 'control'},
    ];

    const envOption2 = [
        {value: "local", label: "local", realValue: "local"},
        {value: "local2", label: "local2", realValue: "local2"},
        {value: "dev", label: "dev", realValue: "dev"},
        {value: "test", label: "test", realValue: "test"},
        {value: "prod", label: "prod", realValue: "prod"},
    ];


    const makeColumn = () => {
        const toMap = diffStatus.fields.map(field => {
                let jsonMap = new Object();
                jsonMap.name = field;
                jsonMap.selector = row => row.fields[field];
                jsonMap.sortable = true;
                return jsonMap;
            }
        );
        return toMap;
    }

    const defaultColumns = [
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
    ];

    const makeColumns = () => {
        const result = [
            ...defaultColumns,
            ...makeColumn(),
        ]
        return result;
    };


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
        // console.log(response.list);
        console.log('diffStatus : ', response);
        setDiffStatus(response);
    };

    const doTransfer = async (ids) => {
        const response = await postTransfer(collection, sourceEnv, targetEnv, ids);
    }


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
                <CCol md={2}>
                    <CButton color="secondary" onClick={handleTransfer}>transfer</CButton>
                </CCol>
            </CRow>

            <DataTable
                columns={column}
                data={data}
                selectableRows
                pagination
                onRowClicked={diffShow}
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleCleared}
                // expandableRowsComponent={ExpandedComponent2}
            />

            <DiffModal
                visible={visible}
                setVisible={setVisible}
                response={diffData}/>
        </CContainer>
    );
}
