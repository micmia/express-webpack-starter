import React, {Component} from 'react';
import {List} from 'immutable';

export default class StoriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: List()
    };
  }

  componentDidMount() {
    (async() => {
      try {
        const res = await fetch('/api/stories');
        const data = await res.json();

        this.setState(({stories}) => ({
          stories: List(data)
        }));
      } catch (e) {

      }
    })();
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.stories.map(story =>
            <li key={story._id}>{story.name}</li>
          )}
        </ul>
      </div>
    );
  }
};