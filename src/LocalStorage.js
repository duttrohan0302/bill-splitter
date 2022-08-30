import React from "react";

const LocalStorage = ({ bill, updateBill, people, setPeople }) => {
  const localSave = () => {
    const savingName = prompt("What name would you like to save it as?")

    let savedList = JSON.parse(localStorage.getItem("restaurant-list"))
    if(!savedList){
      savedList=[]
    }
    localStorage.setItem("restaurant-list",JSON.stringify([...savedList,savingName]))
    localStorage.setItem(`${savingName}-bill`, JSON.stringify(bill));
    localStorage.setItem(`${savingName}-participants`, JSON.stringify(people));
  };
  const fetchFromLocal = () => {
    let savedList = JSON.parse(localStorage.getItem("restaurant-list"))
    if(!savedList){
      savedList=[]
    }
    const savedName = prompt(`What bill are you trying to fetch? ${savedList.join(",")}`)

    updateBill(JSON.parse(localStorage.getItem(`${savedName}-bill`)));
    setPeople(JSON.parse(localStorage.getItem(`${savedName}-participants`)));
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
