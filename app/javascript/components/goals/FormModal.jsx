import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../shared/Modal';
import CurrencyInput from '../shared/CurrencyInput';
import { Goals } from '../../api/main';
import { Alerts } from '../../helpers/main';

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: this.props.goals.monthly || 0,
      errors: {},
    };
  }

  handleGoalChange = (num) => { this.setState({ goal: num }); }
  handleErrors = (key, errs) => { this.setState({ errors: Object.assign(this.state.errors, { [key]: errs }) }); }
  handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(this.state.errors).flat().length) { return; }

    Goals.update({ monthly_goal: this.state.goal }).then(
      (resp) => { this.props.onSave(resp); },
      () => { Alerts.genericError(); },
    );
  }

  render() {
    return (
      <Modal title="Edit Goal" onClose={this.props.onClose}>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-group">
              <label>Total Monthly Goal</label>
              <CurrencyInput initialValue={this.state.goal} onChange={this.handleGoalChange} />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-dark">Save</button>
          </div>
        </form>
      </Modal>
    );
  }
}

FormModal.defaultProps = {
  goals: {
    monthly: 0,
  },
};

FormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  goals: PropTypes.object,
};

export default FormModal;
