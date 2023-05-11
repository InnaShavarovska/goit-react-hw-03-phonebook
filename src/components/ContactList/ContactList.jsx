import { Component } from 'react';
import PropTypes from 'prop-types';
import ContactListItem from '../ContactItem/ContactItem';

export class ContactList extends Component {
  render() {
    const { contacts, onRemoveContact, filter } = this.props;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <ul>
        {filteredContacts.map(({ id, name, number }) => (
          <ContactListItem
            key={id}
            contact={{ id, name, number }}
            onRemoveContact={onRemoveContact}
          />
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onRemoveContact: PropTypes.func,
  filter: PropTypes.string,
};
