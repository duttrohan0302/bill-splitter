import "./App.css";
import React, { useState } from "react";
import Bill from "./Bill";
import Participants from "./Participants";
import LocalStorage from "./LocalStorage";
import { initialBill, initialPerson } from "./constants";

const App = () => {
  const [bill, updateBill] = useState(initialBill);

  const [people, setPeople] = useState([initialPerson]);

  return (
    <div className="text-center">
      <LocalStorage
        bill={bill}
        updateBill={updateBill}
        people={setPeople}
        setPeople={setPeople}
      />
      <Bill bill={bill} updateBill={updateBill} />
      <Participants
        allItems={bill.items}
        people={people}
        setPeople={setPeople}
      />
    </div>
  );
};

export default App;
