import React from "react";

const BillItem = ({ item, updateItem, addItem, removeItem }) => {
  const { id, name, quantity, cost } = item;
  return (
    <>
      <div className="col-4">
        <input
          className="item-name"
          value={name}
          name="name"
          onChange={(e) => updateItem(id, e)}
          type="text"
          placeholder="Item Name"
        />
      </div>
      <div className="col-2">
        <input
          className="item-quantity"
          type="text"
          name="quantity"
          onChange={(e) => updateItem(id, e)}
          value={quantity ? quantity : ""}
          placeholder="Item Quantity"
        />
      </div>
      <div className="col-2">
        <input
          className="item-cost"
          type="text"
          name="cost"
          onChange={(e) => updateItem(id, e)}
          value={cost ? cost : ""}
          placeholder="Item Cost"
        />
      </div>
      <div className="col-1 pointer green">
        <i className="fa fa-plus-circle green" aria-hidden="true" onClick={addItem}></i> &nbsp;
        <i className="fa fa-minus-circle red" aria-hidden="true" onClick={()=>removeItem(id)}></i>
      </div>
    </>
  );
};

export default BillItem;
