import React, { useState } from "react";

const BillCalculation = ({ bill, people, setPeople }) => {
  const [showContribution, setShowContribution] = useState(false);

    const calculateBill = () => {
      setShowContribution(false)

      const itemCount = {};
      const tax =
        parseFloat(bill.serviceCharge) +
        parseFloat(bill.sgst) +
        parseFloat(bill.cgst);
      const totalWithoutTax = bill.total - tax;

      const flatItems = [].concat(...people.map((peep) => peep.items));
      bill.items.forEach((item) => {
        itemCount[item.name] = flatItems.filter(
          (flatItem) => flatItem.id === item.id
        ).length;
      });

      const peopleWithBill = people.map((peep) => {
        peep.nonTaxContribution = 0;
        if (peep.items.length) {
          peep.items = peep.items.map((item) => {
            item.personTotal =
              (item.cost * item.quantity) / itemCount[item.name];
            peep.nonTaxContribution += item.personTotal;
            return item;
          });
          peep.taxContribution =
            (peep.nonTaxContribution / totalWithoutTax) * tax;
          peep.totalContribution =
            peep.nonTaxContribution + peep.taxContribution;
          if(bill.discount){
            peep.totalContribution = ((100-bill.discount)*peep.totalContribution)/100
          }
        }
        return peep;
      });
      setPeople((oldPeople) => peopleWithBill);
      setShowContribution(true)
    };

  return (
    <div className="col-justify-center row mt-5">
      <h2>
        {" "}
        <button
          type="button"
          className="btn btn-danger w-50"
          onClick={()=>calculateBill()}
        >
          Calculate Bill
        </button>
      </h2>
      {
        showContribution ? 
        (
        <table className="table table-striped table-dark w-50 m-auto ">
            <thead>
                <tr>
                    <th>Person Name</th>
                    <th>Contribution</th>
                </tr>
            </thead>
            <tbody>
                {
                    people.map((person,index)=>(
                        <tr key={index}>
                            <td>
                                {person.name}
                            </td>
                            <td>
                                {Math.round(person.totalContribution)}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>    
        )
        :
        null
      }
    </div>
  );
};

export default BillCalculation;
