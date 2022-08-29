import React from "react";
import Multiselect from 'multiselect-react-dropdown';

const Person = ({person,updatePerson,addPerson,removePerson, allItems,setPeople}) => {
    const {id, name} = person;
    const onSelect = (selectedList, addedItem, personId) => {
        updatePerson(personId,{target:{name:"items",value:selectedList}})
    }
    const onRemove = (selectedList, removedItem, personId) => {
        updatePerson(personId,{target:{name:"items",value:selectedList}})
    }

    return(
      <>
        <div className="mt-2 col-4">
            <label>Person name &nbsp;</label>
            <input
                type="text"
                value={name}
                name="name"
                onChange={(e)=>updatePerson(id,e)}
                placeholder="Person Name"
            />
        </div>
        <div className="col-4">
            <Multiselect
                options={allItems.filter(item=>item.name!=="")} 
                onSelect={(a,b)=>onSelect(a,b,id)} 
                onRemove={(a,b)=>onRemove(a,b,id)} 
                selectedValues={person.items.length ? person.items : []}
                displayValue={"name"}
                />
        </div>

        <div className="col-1 pointer green">
            <i className="fa fa-plus-circle green" aria-hidden="true" onClick={()=>addPerson()}></i> &nbsp;
            <i className="fa fa-minus-circle red" aria-hidden="true" onClick={()=>removePerson(id)}></i>
        </div>
      </>
    )
}

export default Person;