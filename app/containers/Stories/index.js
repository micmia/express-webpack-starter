import React, {Component} from 'react';
import {List} from 'immutable';
import classNames from 'classnames';
import styles from './styles.scss';

export default class StoriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: List()
    };

    this.deleteStory = this.deleteStory.bind(this);
    this.getStories = this.getStories.bind(this);
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

  render() {
    const _styles = {
      card: {
        marginBottom: 10
      }
    };

    return (
      <div className="row">
        {this.state.stories.map(story =>
          <div className="col-sm-6" key={story._id} style={_styles.card} data-id={story._id}>
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">{story.name}</h4>
                <p className="card-text">{story.description}</p>
                <a href="#" className="btn btn-danger" onClick={() => this.deleteStory(story._id)}>Delete</a>
              </div>
            </div>
          </div>
        )}
        <div className="col-sm-6" style={_styles.card}>
          <div className={classNames('card', styles.new)} style={{padding: '10px 0'}}>
            <div className="card-block" style={{textAlign: 'center'}}>
              <i className="fa fa-plus" aria-hidden="true" style={{fontSize: '1.5rem'}}></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
};