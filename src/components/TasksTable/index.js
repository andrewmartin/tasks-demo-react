import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import cx from 'classnames';

const Cell = ({ item, filters, className }) => {
  return (
    <td
      className={cx({
        [className]: filters.includes(item),
        'text-white': filters.includes(item),
      })}>
      {item}
    </td>
  );
};

const Row = ({ id, name, role, location, filters, user, onComplete }) => {
  return (
    <tr key={id}>
      <td>{user}</td>
      <Cell item={name} filters={filters.name} className="bg-primary" />
      <Cell item={role} filters={filters.role} className="bg-danger" />
      <Cell item={location} filters={filters.location} className="bg-success" />

      <td>
        <Button onClick={onComplete} color="primary" size="sm">
          Complete
        </Button>
      </td>
    </tr>
  );
};

export default class TasksTable extends Component {
  onComplete = id => {
    const {
      actions: { completeTask },
    } = this.props;

    completeTask(id);
  };

  render() {
    const { items, filters } = this.props;

    return (
      <Table>
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Task Name</th>
            <th scope="col">Role</th>
            <th scope="col">Location</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <Row
              key={item.id}
              filters={filters}
              onComplete={this.onComplete.bind(this, item.id)}
              {...item}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}
