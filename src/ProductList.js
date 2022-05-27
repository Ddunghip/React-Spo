import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";
import {
    Grid,
    GridColumn,
    GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "./myCommandCell";
import { useState, useEffect } from "react";
import { Button } from '@progress/kendo-react-buttons';

import '@progress/kendo-theme-default/dist/all.css';


const siteId = 'modernofficetech.sharepoint.com,1da6c0dd-1a36-4a65-9620-e7c44cffa4c2,bdc2a6f7-94b2-4fc2-8d6e-4fcb7656a517';
const listId = 'b5b7a913-41bb-4c24-bc7e-7af15a7f4c8b';
const editField = "inEdit";

const ProductList = (props) => {
    const [data, setData] = useState([]);
    const actoken = props.actoken
    const [showedit, setShowedit] = useState(true)
    const handleShowedit = () => setShowedit(true);
    const [showadd, setShowadd] = useState(true)
    const handleShowadd = () => setShowadd(true);
    const [showupdate, setShowupdate] = useState(false);
    const handleShowUpdate = () => setShowupdate(true)



    useEffect(() => {

        let newItems = props.getItems();
        console.log('check New', newItems);
        setData(newItems);
    }, [props]);

    const enterEdit = dataItem => {

        setData(data.map(item => item.id === dataItem.id ? {
            ...item,
            inEdit: true
        } : item))
    };
    const cancel = (dataItem) => {
        setShowedit(true)
        const originalItem = props.getItems().find((p) => p.id === dataItem.id);

        const newData = data.map((item) =>
            item.id === originalItem.id ? originalItem : item
        );
        setData(newData);
    };


    const add = async (dataItem) => {
        dataItem.inEdit = true;
        console.log('check add dataItem', dataItem);
        const newData = props.insertItem(dataItem);
        setData(newData);

        await axios({
            method: "post",
            url: `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items`,
            headers: {
                Authorization: "Bearer " + props.actoken,
                Accept: '*/*'
            },
            data: {
                "fields": {
                    "Title": dataItem.Title,
                    "Description": dataItem.Description,
                    "Category": dataItem.Category,
                    "Price": dataItem.Price
                }

            }
        }).then(response => {
            console.log(response.data.value)
        })
            .catch(error => {
                console.log(error.response)
            })
    };

    const discard = () => {

        const newData = [...data];
        newData.splice(0, 1);
        setData(newData);
    };
    const addNew = () => {

        const newDataItem = {
            inEdit: true,
            Discontinued: false,
        };
        setData([newDataItem, ...data]);
    };
    const itemChange = (event) => {
        const newData = data.map((item) =>
            item.id === event.dataItem.id
                ? { ...item, [event.field || '']: event.value }
                : item
        );
        console.log('new Data', data);
        setData(newData);
    };

    const CommandCell = (props) => (
        <MyCommandCell
            {...props}
            // update={update}
            edit={enterEdit}
            editField={editField}
            cancel={cancel}
            actoken={actoken}
            add={add}
            discard={discard}
        // showedit={showedit}
        // handleShowedit={handleShowedit}
        // showadd={showadd}
        // handleShowadd={handleShowadd}
        // showupdate={showupdate}
        // handleShowUpdate={handleShowUpdate}
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
                        onClick={addNew}

                    >
                        Add new
                    </button>
                </GridToolbar>
                <GridColumn field="id" title="ID" />
                <GridColumn field="Category" title='Category' />
                <GridColumn field="Title" title="Title" format="{0:c}" />
                <GridColumn field="Description" title="Description" />
                <GridColumn field="Price" title='Price' />
                <GridColumn cell={CommandCell} width="200px" />
            </Grid>
            <Button>Click here</Button>


        </>
    );
};

export default ProductList;