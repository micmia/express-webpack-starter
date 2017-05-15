import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Link, withRouter} from 'react-router-dom';
import {Button, Panel} from 'react-bootstrap';
import * as storiesActionCreators from '../../actions/stories';
import styles from './styles.scss';
import FormModal from '../../components/Stories/FormModal';
import {CREATE_STORY_SUCCESS, UPDATE_STORY_SUCCESS} from '../../constants/stories';

class Stories extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  componentDidMount() {
    const {storiesActions, history, match} = this.props;

    if (!history.location.state || history.action === 'POP' || (history.location.state && !history.location.state.m)) {
      storiesActions.getStories();
    }

    switch (match.path) {
      case '/stories/new':
        this.doEditStory();
        break;

      case '/stories/:id/edit':
        this.doEditStory(match.params.id);
        break;

      default:
        return;
    }
  }

  doEditStory(id) {
    const {storiesActions} = this.props;

    storiesActions.editStory(id);

    this.setState({
      showModal: true
    });
  }

  handleSubmit(story) {
    const {storiesActions} = this.props;
    const save = storiesActions[story.get('_id') ? 'updateStory' : 'createStory'];
    const _this = this;

    save(story.toJS()).then(function (action) {
      if (action.type === CREATE_STORY_SUCCESS || action.type === UPDATE_STORY_SUCCESS) {
        storiesActions.getStories();
      }

      _this.setState({
        showModal: false
      });
    });
  }

  handleHide() {
    this.setState({
      showModal: false
    });
  }

  handleExit() {
    this.props.history.replace('/stories', {m: true});
  }

  handleDelete(id) {
    const {storiesActions} = this.props;

    storiesActions.deleteStory(id).then(function () {
      storiesActions.getStories();
    });
  }

  render() {
    const {showModal} = this.state;
    const {stories} = this.props;
    const _styles = {
      card: {
        marginBottom: 10
      }
    };

    return (
      <div className="row">
        <div className="col-sm-12" style={_styles.card}>
          <Link to='/stories/new' className={`btn btn-default ${styles.new}`}>
            <i className="fa fa-plus" aria-hidden="true" style={{fontSize: '1.5rem'}}></i>
          </Link>
        </div>
        {stories.map((story, i) =>
          <div className="col-sm-6" key={story.get('_id')} style={_styles.card} data-id={story.get('_id')}>
            <Panel header={<h3>{story.get('title')}</h3>}>
              <p className="card-text">{story.get('description')}</p>
              <Link to={{pathname: `/stories/${story.get('_id')}/edit`, state: {m: true}}}
                    replace
                    className="btn btn-success">
                <FormattedMessage id="stories.card.edit"/>
              </Link>
              &nbsp;
              <Button bsStyle="danger" onClick={() => this.handleDelete(story.get('_id'))}>
                <FormattedMessage id="stories.card.delete"/>
              </Button>
            </Panel>
          </div>
        )}
        <FormModal show={showModal} onHide={this.handleHide} onExited={this.handleExit} onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stories: state.getIn(['stories', 'items']),
  storyToEdit: state.getIn(['stories', 'itemToEdit'])
});

const mapDispatchToProps = (dispatch) => ({
  storiesActions: bindActionCreators(storiesActionCreators, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Stories));
