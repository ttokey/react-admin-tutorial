import * as React from "react";
import {Fragment, useState} from "react";
import keyBy from 'lodash/keyBy';
import {Datagrid, List, Loading, Pagination, TextField, useQuery} from 'react-admin';

export const envInfos = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="env"/>
            <TextField source="url"/>
            {/*<TextField source="date"/>*/}
            <TextField source="user"/>
        </Datagrid>
    </List>
);

export const CustomEnvInfoList = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [sort, setSort] = useState({field: 'id', order: 'ASC'})
    let {data, total, loading, error} = useQuery({
        type: 'getList',
        resource: 'envInfo',
        payload: {
            pagination: {page, perPage},
            sort,
            filter: {},
        }
    });
    

    if (loading) {
        return <Loading/>
    }
    if (error) {
        return <p>ERROR: {error}</p>
    }

    return (
        <Fragment>
            <Datagrid
                data={keyBy(data, 'id')}
                ids={data.map(({id}) => id)}
                currentSort={sort}
                setSort={(field, order) => setSort({field, order})}
            >
                <TextField source="id"/>
                <TextField source="env"/>
                <TextField source="url"/>
                <TextField source="user"/>
            </Datagrid>
            <Pagination
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
                total={total}
            />
        </Fragment>
    );
}