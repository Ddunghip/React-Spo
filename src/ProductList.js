import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Grid,
    GridColumn,
    GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "./myCommandCell";
import { useState, useEffect } from "react";
import { Button } from '@progress/kendo-react-buttons';

import '@progress/kendo-theme-default/dist/all.css';


const editField = "inEdit";

const ProductList = (props) => {
    const [data, setData] = useState([]);
    const dataspo = props.dataspo
    const getItems = () => {
        setData(dataspo)
        console.log('check here<<<<<<<', dataspo);
        return dataspo
    };
    useEffect(() => {

        let newItems = getItems();
        console.log('checkl new Items', newItems);
        setData(newItems);
    }, [dataspo]);

    const update = dataItem => {
        dataItem.inEdit = false;
        console.log('check dataitem in edit', dataItem.inEdit);
        const newData = updateItem(dataItem);
        setData(newData);
    };
    const updateItem = item => {
        let index = data.findIndex(record => record.id === item.id);
        data[index] = item;
        return data;
    };

    const enterEdit = dataItem => {
        setData(data.map(item => item.id === dataItem.id ? {
            ...item,
            inEdit: true
        } : item))
    };
    const cancel = (dataItem) => {
        const originalItem = getItems().find((p) => p.id === dataItem.id);

        const newData = data.map((item) =>
            item.id === originalItem.id ? originalItem : item
        );
        setData(newData);
    };
    const itemChange = (event) => {
        const newData = data.map((item) =>
            item.id === event.dataItem.id
                ? { ...item, [event.field || '']: event.value }
                : item
        );
        setData(newData);
    };

    const CommandCell = (props) => (
        <MyCommandCell
            {...props}
            update={update}
            edit={enterEdit}
            editField={editField}
            cancel={cancel}
        />
    )



    return (
        <>
            {console.log('check data', data)}
            <Grid
                data={data}
                pageable={true}
                sortable={true}


                style={{ height: "400px" }}
                onItemChange={itemChange}
                editField={editField}
            >
                <GridToolbar>
                    <button
                        title="Add new"
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"

                    >
                        Add new
                    </button>
                </GridToolbar>
                <GridColumn field="id" title="ID" />
                <GridColumn field="Category" title='Category' />
                <GridColumn field="Title" title="Title" format="{0:c}" />
                <GridColumn field="Description" title="Description" />
                <GridColumn field="Category" title='Category' />
                <GridColumn field="Price" title='Price' />
                <GridColumn cell={CommandCell} width="200px" />
            </Grid>
            <Button>Click here</Button>


        </>
    );
};

export default ProductList;