import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './Components/Modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }
  
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Modal Sample component example
        </p>
        <button
          type="button"
        
          onClick={() => this.toggleModal()}
        >
          Toggle Modal
        </button>
        { this.state.showModal &&  <Modal
            closeModal={() => this.toggleModal()}
          >
            <div>
              <h1>This is a test for content</h1>
              <p className="App-intro"> Bacon ipsum dolor amet swine tenderloin doner drumstick. 
                Spare ribs corned beef capicola flank prosciutto drumstick biltong shoulder cow meatloaf beef pork chop pork belly pork loin ground round. 
                Corned beef chicken alcatra chuck sausage pancetta meatball pig tongue pork loin cupim tenderloin. 
                Hamburger kevin tongue bacon sirloin ball tip turkey leberkas filet mignon porchetta cupim ground round. </p>
            </div>
        </Modal>}
      </div>
    );
  }
}

export default App;
