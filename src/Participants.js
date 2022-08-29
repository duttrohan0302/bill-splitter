import React, { useEffect } from "react";
import Person from "./Person";
import { v4 as uuid } from "uuid";

const Participants = ({ allItems, people, setPeople }) => {
  const addPerson = () => {
    setPeople((oldPeople) => [
      ...oldPeople,
      { name: "", items: [], id: uuid() },
    ]);
  };

  const removePerson = (id) => {
    setPeople((oldPeople) => oldPeople.filter((person) => person.id !== id));
  };

  useEffect(() => {
    if (people.length === 0) {
      addPerson();
    }
  }, [people.length]);

  const updatePerson = (id, e) => {
    setPeople((oldPeople) =>
      oldPeople.map((peep) => {
        if (peep.id === id) {
          peep[e.target.name] = e.target.value;
        }
        return peep;
      })
    );
  };
  return (
    <div className="text-center">
      <h1>Participants</h1>
      <div className="justify-content-center row col-12">
        {people.map((person) => (
          <Person
            key={person.id}
            person={person}
            updatePerson={updatePerson}
            addPerson={addPerson}
            removePerson={removePerson}
            allItems={allItems}
            setPeople={setPeople}
          />
        ))}
      </div>
    </div>
  );
};

export default Participants;
