import React, { Component } from 'react';
import cx from 'classnames';
import { withRouter } from 'react-router';

class Pagination extends Component {
  state = {
    links: []
  };

  onNext = e => {
    const { onSelectPage, currentPage } = this.props;
    e.preventDefault();
    onSelectPage({ page: currentPage + 1 });
  };

  onPrev = e => {
    const { onSelectPage, currentPage } = this.props;
    e.preventDefault();
    onSelectPage({ page: currentPage - 1 === 0 ? 1 : currentPage - 1 });
  };

  onGoTo = (target, e) => {
    const { onSelectPage } = this.props;
    e.preventDefault();
    onSelectPage({ page: target });
  };

  componentDidUpdate = prevProps => {
    const { totalEntries, perPage, isLoading } = this.props;

    if (isLoading !== prevProps.isLoading) {
      const links = this.generateLinks(Math.ceil(totalEntries / perPage));
      this.setState({
        links
      });
    }
  };

  generateLinks = amount => {
    const { currentPage } = this.props;
    const links = [];
    for (let page = 1; page < amount + 1; page++) {
      links.push(
        <li
          className={cx('page-item', {
            active: page === currentPage
          })}
          key={page}>
          <a
            className="page-link"
            onClick={this.onGoTo.bind(this, page)}
            href="#">
            {page}
          </a>
        </li>
      );
    }

    return links;
  };

  renderPerPage() {
    const { perPage, onPerPage } = this.props;

    return (
      <>
        <label className="mb-0 mr-2" htmlFor="per_page">
          Per Page
        </label>
        <select
          onChange={e => onPerPage({ per_page: e.target.value })}
          defaultValue={perPage}
          className="form-control mr-2"
          style={{ width: 100 }}
          name="per_page"
          id="per_page">
          {[5, 10, 15, 20, 25].map(amount => (
            <option key={amount} value={amount}>
              {amount}
            </option>
          ))}
        </select>
      </>
    );
  }

  render() {
    const { currentPage, totalEntries, perPage } = this.props;
    if (!currentPage) return null;

    return (
      <nav className="mt-5 d-flex align-items-center justify-content-center">
        {this.renderPerPage()}
        <ul className="pagination flex-1 mb-0">
          {currentPage !== 1 && (
            <li className="page-item">
              <a onClick={this.onPrev} className="page-link" href="#">
                Previous
              </a>
            </li>
          )}
          {this.state.links}
          {currentPage * perPage < totalEntries && (
            <li className="page-item">
              <a onClick={this.onNext} className="page-link" href="#">
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

export default withRouter(Pagination);
