// import { GetData } from "./GetData";

// let data = GetData()
// console.log('>>>>>>>>checkkkk data', GetData());

// const generateId = data => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

// export const insertItem = item => {
//     item.id = generateId(data);
//     item.inEdit = false;
//     data.unshift(item);
//     return data;
// };
// export const getItems = () => {
//     return data;
// };
// export const updateItem = item => {
//     let index = data.findIndex(record => record.id === item.id);
//     data[index] = item;
//     return data;
// };
// export const deleteItem = item => {
//     let index = data.findIndex(record => record.id === item.id);
//     data.splice(index, 1);
//     return data;
// };