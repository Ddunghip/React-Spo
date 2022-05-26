import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
const siteId = 'modernofficetech.sharepoint.com,1da6c0dd-1a36-4a65-9620-e7c44cffa4c2,bdc2a6f7-94b2-4fc2-8d6e-4fcb7656a517';
const listId = 'b5b7a913-41bb-4c24-bc7e-7af15a7f4c8b';

export const MyCommandCell = (props) => {
    const { dataItem } = props;
    // const [{ dataItem }, setDataItem] = React.useState(props)
    console.log('check data item', dataItem);
    const inEdit = dataItem[props.editField];
    console.log('check InEdit', inEdit);
    const isNewItem = dataItem.id === undefined;

    const update = async item => {
        props.handleShowedit()
        item.inEdit = false;
        console.log('check dataitem in edit', item);



        // const newData = 
        // updateItem(dataItem);

        // setData(newData);
        let index = [dataItem].findIndex(record => record.id === item.id);
        dataItem[index] = item;
        console.log('check 1 item ', item);
        // setOneItem(item)
        await axios({
            method: "patch",
            url: `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items/${dataItem.id}/fields`,
            headers: {
                Authorization: "Bearer " + props.actoken,
                Accept: '*/*'
            },
            data: {

                "Title": dataItem.Title,
                "Description": dataItem.Description,
                "Category": dataItem.Category,
                "Price": dataItem.Price

            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.response)
        })


    };


    return (
        props.showedit === true && (
            <td className="k-command-cell">
                <button
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
                    onClick={() => props.edit(dataItem)}
                >
                    Edit
                </button>
                <button
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"

                >
                    Remove
                </button>
            </td>
        ) ||
        props.showedit === false && (
            <td className="k-command-cell">
                <button
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
                    onClick={() => update(dataItem)}
                >
                    Update
                </button>
                <button
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
                    onClick={() => props.cancel(dataItem)
                    }
                >
                    Cancel
                </button>
            </td>
        )
    )
};

// inEdit ? (
//     <td className="k-command-cell">
//         <button
//             className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
//             onClick={() =>
//                 isNewItem ? props.add(dataItem) : update(dataItem)
//             }
//         >
//             {isNewItem ? "Add" : "Update"}
//         </button>
//         <button
//             className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
//             onClick={() =>
//                 isNewItem ? props.discard(dataItem) : props.cancel(dataItem)
//             }
//         >
//             {isNewItem ? "Discard" : "Cancel"}
//         </button>
//     </td>
// ) : (
//     <td className="k-command-cell">
//         <button
//             className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
//             onClick={() => props.edit(dataItem)}
//         >
//             Edit
//         </button>
//         <button
//             className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"

//         >
//             Remove
//         </button>
//     </td>
// );