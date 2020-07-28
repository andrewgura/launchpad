import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class EmailListModal extends Component {
    constructor(props) {
    super(props);
    this.state = {
      show: this.props.show
    }
  }

  render(){
    const { selected, emails } = this.props;
    return (
      <Modal show={this.props.show} onHide={() => this.props.showModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Emails voted for {selected}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selected && emails[selected].map(i => {
          return (
            <p key={i}>{i}</p>
          )
        })}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.showModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}


export default EmailListModal;
