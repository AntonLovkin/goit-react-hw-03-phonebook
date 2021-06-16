import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Filter from "./components/Filter";
import ContactsList from "./components/Contacts/Contacts-list";
import ContactForm from "./components/Contact-form/Contact-form";
class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    // name: "",
    // number: "",
    filter: "",
  };
  addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    const contactNames = this.state.contacts.map((contact) => contact.name);
    this.renderContacts(contactNames, contact.name, contact);
  };

  renderContacts = (contactsList, contactName, newContact) => {
    if (contactsList.includes(contactName)) {
      alert(`${contactName} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
  };

  changeFilter = (evt) => {
    this.setState({ filter: evt.currentTarget.value });
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  DeleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  componentDidMount() {
    console.log("componentDidMount");

    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");

    if (this.state.contacts !== prevState.contacts) {
      console.log("Refresh page");

      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const { filter } = this.state;
    console.log(filter);

    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    console.log(normalizedFilter);

    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />

        <ContactsList
          filteredContacts={filteredContacts}
          onDeleteContact={this.DeleteContact}
        />
      </div>
    );
  }
}

export default App;

//----- Код до создания компонентов-----
// addContact = (name, number) => {
//   const contact = {
//     id: uuidv4(),
//     name,
//     number,
//   };

//   this.setState((prevState) => ({

//     contacts: [contact, ...prevState.contacts],
//   }));
// };

// handleChangeNumber = (evt) => {
//   this.setState({
//     // name: evt.currentTarget.value,
//     number: evt.target.numbervalue,
//   });
// };

// handleChange = ({ target }) => {
//   const { name, value } = target;
//   this.setState({
//     [name]: value,
//   });
// };

// handleSubmit = (evt) => {
//   evt.preventDefault();
//   const { name, number } = this.state;

//   this.addContact(name, number);
//   this.setState({ name: "", number: "" });
//   this.reset();
// };
//------------------------------------------------------------
