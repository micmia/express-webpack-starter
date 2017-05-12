import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Field, reduxForm} from 'redux-form/immutable';
import {Modal} from 'react-bootstrap';
import * as storiesActionCreators from '../../actions/stories';

class FormModal extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, submitting, show, onHide} = this.props;

    return (
      <Modal show={show} onHide={onHide}>
        <form onSubmit={handleSubmit} noValidate>
          <Modal.Header>
            <Modal.Title>
              <Field name="title" className="form-control" component="input"/>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field name="description" className="form-control" component="textarea" rows="5"/>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <FormattedMessage id="stories.modal.save"/>
            </button>
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              <FormattedMessage id="stories.modal.close"/>
            </button>
          </Modal.Footer>
        </form>
      </Modal>);
  }
}

const mapStateToProps = (state) => {
  const story = state.getIn(['stories', 'items']).find(function (item) {
    return item.get('_id') === state.getIn(['stories', 'itemToEdit']);
  });

  return {
    initialValues: story
  };
};

const mapDispatchToProps = (dispatch) => ({
  storiesActions: bindActionCreators(storiesActionCreators, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null)(reduxForm({
  form: 'editStoryModal',
  enableReinitialize: true
})(FormModal)));
