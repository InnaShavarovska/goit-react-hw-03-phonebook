import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './Form/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parcedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parcedContacts });
      return;
    }
    this.setState({ contacts: [] });
  }

  onSubmit = event => {
    event.preventDefault();

    const { name, number } = event.target.elements;

    const contact = {
      name: name.value,
      number: number.value,
      id: nanoid(),
    };

    if (this.state.contacts.find(contact => contact.name === name.value)) {
      alert(`${name.value} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));

    event.target.reset();
  };

  onRemoveContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.onChange} />
        <ContactList
          contacts={this.state.contacts}
          onRemoveContact={this.onRemoveContact}
          filter={this.state.filter}
        />
      </div>
    );
  }
}
