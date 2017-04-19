import React, {Component} from 'react';
import {List} from 'immutable';
import classNames from 'classnames';
import styles from './styles.scss';
import StoryModal from '../../components/StoryModal';

export default class StoriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: List(),
      selectedStory: {}
    };

    this.getStories = this.getStories.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
    this.createStory = this.createStory.bind(this);
    this.handleSaveStory = this.handleSaveStory.bind(this);
  }

  componentDidMount() {
    this.getStories();
  }

  getStories() {
    fetch('/api/stories').then(res => res.json()).then(data => {
      this.setState(({stories}) => ({stories: List(data)}));
      this.props._parent.setState(Object.assign({}, this.props.state, {storiesCount: data.length}));
    });
  }

  deleteStory(id) {
    fetch(`/api/stories/${id}`, {method: 'DELETE'}).then(res => res.json()).then(data => {
      this.setState({stories: this.state.stories.filter(s => s._id !== id)});
      this.getStories();
    });
  }

  updateStory(i) {
    this.setState({selectedStory: this.state.stories.get(i)});
    $(this.modal.element).modal();
  }

  createStory() {
    this.setState({selectedStory: {_id: '', title: '', description: ''}});
    $(this.modal.element).modal();
  }

  handleSaveStory(story) {
    if (story.hasOwnProperty('_id')) {
      fetch(`/api/stories/${story._id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(story)
      }).then(res => res.json()).then(data => {
        this.getStories();
        $(this.modal.element).modal('toggle');
      });
    } else {
      fetch(`/api/stories`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(story)
      }).then(res => res.json()).then(data => {
        this.getStories();
        $(this.modal.element).modal('toggle');
      });
    }
  }

  render() {
    const _styles = {
      card: {
        marginBottom: 10
      }
    };

    const {stories, selectedStory} = this.state;

    return (
      <div className="row">
        <div className="col-sm-12" style={_styles.card}>
          <div className={classNames('card', styles.new)} style={{padding: '10px 0'}}>
            <div className="card-block" style={{textAlign: 'center'}} onClick={this.createStory}>
              <i className="fa fa-plus" aria-hidden="true" style={{fontSize: '1.5rem'}}></i>
            </div>
          </div>
        </div>
        {stories.map((story, i) =>
          <div className="col-sm-6" key={story._id} style={_styles.card} data-id={story._id}>
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">{story.title}</h4>
                <p className="card-text">{story.description}</p>
                <button className="btn btn-success" onClick={() => this.updateStory(i)}>Edit</button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => this.deleteStory(story._id)}>Delete</button>
              </div>
            </div>
          </div>
        )}
        <StoryModal {...selectedStory} onSave={this.handleSaveStory} ref={comp => {
          this.modal = comp;
        }}/>
      </div>
    );
  }
};