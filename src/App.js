import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Register from './components/Register/Register'
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn'
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 900
      }
    },
    line_linked: {
      enable_auto: true
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
        distance: 25
      }
    }
  }
}

const initialState = {
  input: 'https://i.scdn.co/image/e1e0353693229e0a2a0877aba2af50dec5ef4385',
  ImageUrl: 'https://i.scdn.co/image/e1e0353693229e0a2a0877aba2af50dec5ef4385',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user : {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFace.map(region => {
      return{
        topRow: height * region.top_row,
        botRow: height * (1 - region.bottom_row),
        leftCol: width * region.left_col,
        rightCol: width * (1 - region.right_col)
      }
    });
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('https://hidden-eyrie-71695.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp){
          fetch('https://hidden-eyrie-71695.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(resp => resp.json())
            .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(resp))
      })
      .catch(err => console.error(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState);
    }
    else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {
          this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
            </div>
          : this.state.route === 'register'
          ? <Register loadUser={this.loadUser}  onRouteChange={this.onRouteChange} />
          : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
