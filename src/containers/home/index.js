import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import { actions as taskActions } from 'reducers/task';
import TasksTable from 'components/TasksTable';
import Pagination from 'components/Pagination';

class Home extends Component {
  state = {
    page: 1,
    per_page: 5
  };

  componentDidMount() {
    const { page, per_page } = this.state;

    this.fetchData({
      page,
      per_page
    });
  }

  componentDidUpdate(_prevProps, prevState) {
    const { page, per_page } = this.state;

    if (prevState.page !== page || prevState.per_page !== per_page) {
      this.fetchData({
        page,
        per_page
      });
    }
  }

  fetchData = ({ page }) => {
    const {
      actions: { getTasks }
    } = this.props;

    const { per_page } = this.state;

    getTasks({
      page,
      per_page
    });
  };

  render() {
    const {
      task: { items, isLoading, total_entries }
    } = this.props;

    const { page, per_page } = this.state;

    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Tasks</h2>
            <TasksTable items={items} />
            <Pagination
              isLoading={isLoading}
              onSelectPage={({ page }) =>
                this.setState({
                  page
                })
              }
              onPerPage={({ per_page }) =>
                this.setState({
                  per_page
                })
              }
              perPage={per_page}
              totalEntries={total_entries}
              currentPage={page}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ task }) => ({
  task
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...taskActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
