import React, {Component} from 'react';

export default class StoryModal extends Component {
  toggle() {
    $(this.modal).modal();
  }

  render() {
    const {title, description} = this.props.story;

    return (
      <div className="modal fade" ref={dom => this.modal = dom}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{description}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Save changes</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>);
  }
};