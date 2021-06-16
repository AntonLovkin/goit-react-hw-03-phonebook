import React from "react";
// import './TodoList.css';

const ContactsList = ({ filteredContacts, onDeleteContact }) => (
  <ul>
    {filteredContacts.map(({ name, number, id }) => (
      <li key={id} className="TodoList__item">
        <p>
          {name} : {number}
        </p>
        <button onClick={() => onDeleteContact(id)}>Удалить</button>
      </li>
    ))}
  </ul>
);

export default ContactsList;
