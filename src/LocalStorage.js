import React from "react";

const LocalStorage = ({ bill, updateBill, people, setPeople }) => {
  const localSave = () => {
    localStorage.setItem("bill", JSON.stringify(bill));
    localStorage.setItem("participants", JSON.stringify(people));
  };
  const fetchFromLocal = () => {
    updateBill(JSON.parse(localStorage.getItem("bill")));
    setPeople(JSON.parse(localStorage.getItem("participants")));
  };
  return (
    <div className="col-justify-center row m-auto">
      <div className="col-8">
        <h1>Bill Splitter</h1>
      </div>
      <div className="col-4">
        <button type="button" className="btn btn-success" onClick={localSave}>
          Save To Local
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={fetchFromLocal}
        >
          Fetch from Local
        </button>
      </div>
    </div>
  );
};

export default LocalStorage;
