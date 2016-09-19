import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import * as WorkflowActions from 'redux/actions/WfconfigActions';

const Header = require('./ConfigHeader');
const List = require('./ConfigList');

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WorkflowActions, dispatch)
  };
}

@connect(({ wfconfig, project }) => ({ wfconfig, project }), mapDispatchToProps)
export default class ConfigContainer extends Component {
  constructor(props) {
    super(props);
    this.pid = '';
    this.id = '';
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    wfconfig: PropTypes.object.isRequired
  }

  async index() {
    await this.props.actions.index(this.pid, this.id);
    return this.props.wfconfig.ecode;
  }

  async save(values) {
    await this.props.actions.save(this.pid, this.id, values);
    return this.props.wfconfig.ecode;
  }

  componentWillMount() {
    const { params: { key, id } } = this.props;
    this.pid = key;
    this.id = id;
  }

  render() {

    if (this.props.wfconfig && this.props.wfconfig.options && this.props.project && this.props.project.options) {
      this.props.wfconfig.options.users = this.props.project.options.users || []; 
    }

    return (
      <div>
        <Header createStep={ this.props.actions.createStep } save={ this.save.bind(this) } pid={ this.pid } { ...this.props.wfconfig }/>
        <List index={ this.index.bind(this) } editStep={ this.props.actions.editStep } delStep={ this.props.actions.delStep } addAction={ this.props.actions.addAction } editAction={ this.props.actions.editAction } delAction={ this.props.actions.delAction } { ...this.props.wfconfig }/>
      </div>
    );
  }
}
