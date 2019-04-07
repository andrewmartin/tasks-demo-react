import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class TasksFilter extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  onFilter = value => {
    const { onFilter, category } = this.props;
    onFilter({
      category,
      value,
    });
  };

  render() {
    const { name, category, items, filters } = this.props;

    const set = new Set();
    items.map(item => set.add(item[category]));

    return (
      <Dropdown className="mb-2" isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle caret>{name}</DropdownToggle>
        <DropdownMenu>
          {[...set].map(item => (
            <DropdownItem
              onClick={this.onFilter.bind(this, item)}
              key={item}
              active={filters[category].includes(item)}>
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
