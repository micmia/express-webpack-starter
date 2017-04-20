import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as storiesActionCreators from '../../actions/stories';
import styles from './styles.scss';

class StoriesComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.storiesActions.getStories();
  }

  render() {
    const _styles = {
      card: {
        marginBottom: 10
      }
    };

    const {stories} = this.props;

    return (
      <div className="row">
        <div className="col-sm-12" style={_styles.card}>
          <div className={classNames('card', styles.new)} style={{padding: '10px 0'}}>
            <div className="card-block" style={{textAlign: 'center'}}>
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
                <button className="btn btn-success">Edit</button>
                &nbsp;
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stories: state.getIn(['stories', 'items']),
});

const mapDispatchToProps = (dispatch) => ({
  storiesActions: bindActionCreators(storiesActionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoriesComponent);
