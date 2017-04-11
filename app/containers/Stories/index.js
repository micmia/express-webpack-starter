import React, {Component} from 'react';
import {List} from 'immutable';

export default class StoriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: List()
    };

    this.deleteStory = this.deleteStory.bind(this);
  }

  componentDidMount() {
    // (async() => {
    //   try {
    //     const res = await fetch('/api/stories');
    //     const data = await res.json();
    //
    //     this.setState(({stories}) => ({
    //       stories: List(data)
    //     }));
    //   } catch (e) {
    //
    //   }
    // })();
  }

  deleteStory(id) {
    //   (async() => {
    //     try {
    //       const res = await fetch(`/api/stories/${id}`, {method: 'DELETE'});
    //       const data = await res.json();
    //
    //       this.setState({stories: this.state.stories.filter(s => s._id !== id)});
    //     } catch (e) {
    //
    //     }
    //   })();
  }

  render() {
    const styles = {
      card: {
        marginBottom: 10
      }
    };

    return (
      <div className="row">
        {this.state.stories.map(story =>
          <div className="col-sm-6" key={story._id} style={styles.card} data-id={story._id}>
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">{story.name}</h4>
                <p className="card-text">{story.description}</p>
                <a href="#" className="btn btn-danger" onClick={() => this.deleteStory(story._id)}>Delete</a>
              </div>
            </div>
          </div>
        )}
        <div className="col-sm-6" style={styles.card}>
          <div className="card" style={{height: '100%'}}>
            <div className="card-block" style={{textAlign: 'center'}}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
};