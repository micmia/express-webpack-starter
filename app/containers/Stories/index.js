import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import * as storiesActionCreators from '../../actions/stories';
import styles from './styles.scss';
import Modal from './Modal';

class Stories extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      element: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.props.storiesActions.getStories();
  }

  handleSubmit(story) {
    const {storiesActions} = this.props;
    const save = storiesActions[story.get('_id') ? 'updateStory' : 'createStory'];

    save(story.toJS()).then(function () {
      $('#editStoryModal').modal('hide');
      storiesActions.getStories();
    });
  }

  handleEdit(i) {
    const {storiesActions} = this.props;

    storiesActions.editStory(i);
    $('#editStoryModal').modal('show');
  }

  handleDelete(id) {
    const {storiesActions} = this.props;

    storiesActions.deleteStory(id).then(function () {
      storiesActions.getStories();
    });
  }

  render() {
    const {stories} = this.props;
    const _styles = {
      card: {
        marginBottom: 10
      }
    };

    return (
      <div className="row">
        <div className="col-sm-12" style={_styles.card}>
          <div className={classNames('card', styles.new)} style={{padding: '10px 0'}}>
            <div className="card-block" style={{textAlign: 'center'}} onClick={() => this.handleEdit()}>
              <i className="fa fa-plus" aria-hidden="true" style={{fontSize: '1.5rem'}}></i>
            </div>
          </div>
        </div>
        {stories.map((story, i) =>
          <div className="col-sm-6" key={story.get('_id')} style={_styles.card} data-id={story.get('_id')}>
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">{story.get('title')}</h4>
                <p className="card-text">{story.get('description')}</p>
                <button className="btn btn-success" onClick={() => this.handleEdit(i)}>
                  <FormattedMessage id="stories.card.edit"/>
                </button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => this.handleDelete(story.get('_id'))}>
                  <FormattedMessage id="stories.card.delete"/>
                </button>
              </div>
            </div>
          </div>
        )}
        <Modal id="editStoryModal" onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stories: state.getIn(['stories', 'items']),
  storyToEdit: state.getIn(['stories', 'itemToEdit'])
});

const mapDispatchToProps = (dispatch) => ({
  storiesActions: bindActionCreators(storiesActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
