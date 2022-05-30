import * as React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
export const DropDownCell = props => {
    console.log('check props dropdown', props.field.inEdit);
    const localizedData = [{
        text: 'Chess',
        value: 'Chess'

    }, {
        text: 'Soccers',
        value: 'Soccers'
    }, {
        text: 'Running',
        value: 'Running'
    }];

    const handleChange = e => {
        if (props.onChange) {
            props.onChange({
                dataIndex: 0,
                dataItem: props.dataItem,
                field: props.field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value.value
            });
        }
    };

    const {
        dataItem
    } = props;
    const field = props.field || '';
    const dataValue = dataItem[field] === null ? '' : dataItem[field];
    return <td>
        {dataItem.inEdit ?
            <DropDownList style={{
                width: "100px"
            }} onChange={handleChange} value={localizedData.find(c => c.value === dataValue)} data={localizedData} textField="text" /> : dataValue}
    </td>;
};