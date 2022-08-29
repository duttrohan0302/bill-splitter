import { v4 as uuid } from 'uuid';

const initialItem = {
    id: uuid(),
    name: "",
    quantity: 0,
    cost: 0
}
const initialPerson = {
    id: uuid(),
    name: "",
    items:[]
}
const initialBill = {
    items:[
        initialItem
    ],
    total: 0,
    sgst: 0,
    cgst: 0,
    serviceCharge: 0,
    discount: 0,
    restaurantName: "",
}

export {
    initialBill, initialItem, initialPerson
}