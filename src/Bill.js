import React, { useEffect, useState } from "react";
import BillItem from "./BillItem";
import { v4 as uuid } from 'uuid';

const Bill = ({
    bill,
    updateBill,

}) => {

  const [totalSgst, setTotalSgst] = useState(0);
  const [totalCgst, setTotalCgst] = useState(0);
  const [totalServiceCharge, setTotalServiceCharge] = useState(0);

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

  useEffect(() => {
    if (total <= 0) {
      setTotalCgst(0);
      setTotalSgst(0);
      setTotalServiceCharge(0);
    } else {
      if (cgst >= 0) {
        setTotalCgst((cgst * total) / 100);
      }
      if (sgst >= 0) {
        setTotalSgst((sgst * total) / 100);
      }
      if (serviceCharge >= 0) {
        setTotalServiceCharge((serviceCharge * total) / 100);
      }
    }
  }, [total, sgst, cgst, serviceCharge]);

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
        <label>Service Charge Percentage &nbsp;</label>
        <input
          type="text"
          value={serviceCharge ? serviceCharge : ""}
          name="serviceCharge"
          onChange={updateBillGeneric}
          placeholder="Service Charge"
        />
        = {totalServiceCharge}
      </div>
      <div className="mt-2">
        <label>SGST Percentage &nbsp; </label>
        <input
          type="text"
          value={sgst ? sgst : ""}
          name="sgst"
          onChange={updateBillGeneric}
          placeholder="SGST Percentage"
        />
        = {totalSgst}
      </div>
      <div className="mt-2">
        <label>CGST Charge &nbsp;</label>
        <input
          type="text"
          value={cgst ? cgst : ""}
          name="cgst"
          onChange={updateBillGeneric}
          placeholder="CGST Percentage"
        />
        = {totalCgst ? totalCgst : 0}
      </div>
    </div>
  );
};

export default Bill;
