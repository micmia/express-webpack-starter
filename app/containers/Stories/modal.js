import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form/immutable';
import * as storiesActionCreators from '../../actions/stories';

class Modal extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {id, handleSubmit, submitting} = this.props;

    return (
      <div className="modal fade" ref="modal" id={id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={handleSubmit} noValidate>
              <div className="modal-header">
                <h5 className="modal-title">
                  <Field name="title" className="form-control" component="input"/>
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Field name="description" className="form-control" component="textarea" rows="5"/>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary" disabled={submitting}>Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  const story = state.getIn(['stories', 'items']).get(state.getIn(['stories', 'itemToEdit']));

  return {
    initialValues: story,
    id: ownProps.id
  };
};

const mapDispatchToProps = (dispatch) => ({
  storiesActions: bindActionCreators(storiesActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(reduxForm({
  form: 'modal',
  enableReinitialize: true
})(Modal));
