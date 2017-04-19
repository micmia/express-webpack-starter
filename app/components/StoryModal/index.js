import React, {PureComponent} from 'react';

export default class StoryModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {_id: '', title: '', description: ''};
    this.state = Object.assign({}, this.state, this.props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    return this.props.onSave(this.state);
  }

  render() {
    const {title, description} = this.state;

    return (
      <div className="modal fade" ref={dom => this.element = dom}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="modal-header">
                <h5 className="modal-title">
                  <input type="text" name="title" className="form-control" value={title} onChange={this.handleChange}/>
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <textarea className="form-control" name="description"
                        value={description} rows="5" onChange={this.handleChange}>
              </textarea>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>);
  }
};
