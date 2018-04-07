import React from 'react';

class Person {
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

Person.schema = {
  name: 'Person',
  properties: {
    firstName: 'string',
    lastName: 'string'
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { realmQueryResult: 'null' };
  }

  handleRealmWrite() {
    try {
      const Realm = require('realm');
      Realm.open({ schema: [Person] })
        .then(realm => {
          // ...use the realm instance here
          realm.write(() => {
            const john = realm.create('Person', {
              firstName: 'John',
              lastName: 'Smith'
            });
            john.lastName = 'Peterson';
            console.log(john.fullName); // -> 'John Peterson'
          });
        })
        .catch(error => {
          // Handle the error here if something went wrong
          this.setState({ realmQueryResult: error.stack });
        });
      this.setState({ realmQueryResult: 'loading' });
    } catch (e) {
      this.setState({ realmQueryResult: e.stack });
    }
  }

  handleRealmQuery() {
    try {
      const Realm = require('realm');
      Realm.open({ schema: [Person] })
        .then(realm => {
          let people = realm.objects('Person');
          if (people.length > 0) {
            this.setState({
              realmQueryResult: people[0].firstName,
            });
          }

          console.log(people);
        })
        .catch(error => {
          // Handle the error here if something went wrong
          this.setState({ realmQueryResult: error.stack });
        });
      this.setState({ realmQueryResult: 'loading' });
    } catch (e) {
      this.setState({ realmQueryResult: e.stack });
    }
  }

  render() {
    return (<div>
      <h2>Welcome to React!</h2>
      <div>
        <button onClick={() => {
          this.handleRealmWrite();
        }}>
          Realm
        </button>
        <button onClick={() => {
          this.handleRealmQuery();
        }}>
          {this.state.realmQueryResult}
        </button>
      </div>
    </div>);
  }
}
