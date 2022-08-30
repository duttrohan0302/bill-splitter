import React, { useEffect } from "react";
import BillItem from "./BillItem";
import { v4 as uuid } from 'uuid';

const Bill = ({
    bill,
    updateBill,

}) => {

  const { restaurantName, items, sgst, cgst, discount, serviceCharge, total } =
    bill;

  const updateBillGeneric = (e) => {
    updateBill((oldBill) => ({ ...oldBill, [e.target.name]: e.target.value }));
  };

  const addItem = () => {
    updateBill((oldBill) => ({
        ...oldBill,
        items: [...oldBill.items,{name:"",quantity:0,cost:0,id:uuid()}],
      }));
  };

  const removeItem = (id) => {
    updateBill((oldBill) => ({
      ...oldBill,
      items: oldBill.items.filter((item) => item.id !== id),
    }));
  };

  const updateItem = (id, e) => {
    updateBill((oldBill) => ({
      ...oldBill,
      items: oldBill.items.map((item) => {
        if (item.id === id) {
          item[e.target.name] = e.target.value;
        }
        return item;
      }),
    }));
  };

  useEffect(()=>{
    if(bill.items.length===0){
        addItem()
    }
  },[bill.items])
  return (
    <div className="justify-content-center">
      <div className="">
        <input
          type="text"
          value={restaurantName}
          name="restaurantName"
          onChange={updateBillGeneric}
          placeholder="Restaurant Name"
        />
      </div>
      <div className="mt-2">
        <label>Total &nbsp;</label>
        <input
          type="text"
          value={total ? total : ""}
          name="total"
          onChange={updateBillGeneric}
          placeholder="Restaurant Total"
        />
      </div>
      <div className="mt-2">
        <label>Discount Percentage &nbsp;</label>
        <input
          type="text"
          value={discount ? discount : ""}
          name="discount"
          onChange={updateBillGeneric}
          placeholder="Discount Percentage"
        />
      </div>
      <div className="item-details row mt-2">
        {items.map((item) => (
          <BillItem
            key={item.id}
            item={item}
            updateItem={updateItem}
            addItem={addItem}
            removeItem={removeItem}
          />
        ))}
      </div>
      <div className="mt-2">
        <label>Service Charge Total &nbsp;</label>
        <input
          type="text"
          value={serviceCharge ? serviceCharge : ""}
          name="serviceCharge"
          onChange={updateBillGeneric}
          placeholder="Service Charge"
        />
      </div>
      <div className="mt-2">
        <label>SGST Total&nbsp; </label>
        <input
          type="text"
          value={sgst ? sgst : ""}
          name="sgst"
          onChange={updateBillGeneric}
          placeholder="SGST"
        />
      </div>
      <div className="mt-2">
        <label>CGST Total &nbsp;</label>
        <input
          type="text"
          value={cgst ? cgst : ""}
          name="cgst"
          onChange={updateBillGeneric}
          placeholder="CGST"
        />
      </div>
    </div>
  );
};

export default Bill;
