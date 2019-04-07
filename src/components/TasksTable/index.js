import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

export default class TasksTable extends Component {
  renderRow = item => {
    const { name, user, role, location } = item;

    return (
      <tr>
        <td>{name}</td>
        <td>{user}</td>
        <td>{role}</td>
        <td>{location}</td>
        <td>
          <Button color="primary" size="sm">
            Complete
          </Button>
        </td>
      </tr>
    );
  };

  render() {
    const { items } = this.props;

    return (
      <Table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">User</th>
            <th scope="col">Role</th>
            <th scope="col">Location</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {items.map(this.renderRow)}
      </Table>
    );
  }
}
