import React, { Component } from 'react';
import { Button, Table, Form, Row, Col  } from 'react-bootstrap';
import EmailListModal from './EmailListModal';

class FrameworkTable extends Component {
    constructor(props) {
    super(props);
    this.state = {
      frameWorks: [],
      emails: {react: [], angular: [], ember: [], vue: []},
      email: '',
      choice: 'react',
      showModal: false,
      selectedFramework: ''
    }
  }

  async componentDidMount() {
    const frameWorks = ["facebook/react", "angular/angular.js", "emberjs/ember.js", "vuejs/vue"];

    const data = await Promise.all(frameWorks.map(async i => {
      const response = await fetch('https://api.github.com/repos/' + i);
      const result = await response.json();
      return result;
    }))
    this.setState({frameWorks: data})
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  vote(e) {
    e.preventDefault();
    const { emails, email, choice } = this.state;

    if(this.checkValidEmail(email)) {

      const emailvalues = Object.values(emails);
      const emailList = [].concat.apply([], emailvalues)

      if(emailList.includes(email)) {
        alert("Email already voted");
      } else {
        this.setState(prevState => ({
            emails: {
                ...prevState.emails,
                [choice]: [...prevState.emails[choice], email]
            }
        }))
      }
    }

  }

  checkValidEmail(emailField){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(emailField) == false)
      {
          alert('Invalid Email Address');
          return false;
      }

      return true;
  }

  showModal(name) {
    this.setState({selectedFramework: name, showModal: !this.state.showModal})
  }

  render(){
    const { frameWorks, email, emails, showModal, selectedFramework } = this.state;
    return (
      <div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Framework</th>
              <th>Votes</th>
              <th>Watchers</th>
              <th>Stars</th>
              <th>Forks</th>
            </tr>
          </thead>
          <tbody>
          {frameWorks.map(i => {
            const name = i.name.split('.')[0];
            return (
              <tr key={i.id}>
                <td>{name}</td>
                <td onClick={this.showModal.bind(this, name)}><Button>{emails[name].length}</Button></td>
                <td>{i.watchers}</td>
                <td>{i.stargazers_count}</td>
                <td>{i.forks}</td>
              </tr>
            )
          })}
        </tbody>
        </Table>

        <Form onSubmit={this.vote.bind(this)}>
          <Row>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Email" value={email} name="email" onChange={this.handleChange.bind(this)}/>
          </Col>
          <Col>
            <Form.Label>Framework</Form.Label>
            <Form.Control
              as="select"
              name="choice"
              onChange={this.handleChange.bind(this)}
            >
              <option value="react">React</option>
              <option value="angular">Angular</option>
              <option value="ember">Ember</option>
              <option value="vue">Vue</option>
            </Form.Control>
          </Col>
        </Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <EmailListModal show={showModal} emails={emails} selected={selectedFramework} showModal={this.showModal.bind(this)}/>
      </div>
    )
  }
}

export default FrameworkTable;
