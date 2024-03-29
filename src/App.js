import React, { Component } from 'react'
import './App.css';
import Rank from './Components/Rank/Rank'
import Navigation from './Components/Navigation/Navigation'
import ImagelinkForm from './Components/ImageLinkForm/Imagelinkform'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import ImageDisplay from './Components/ImageDisplay/ImageDisplay'
import SignIn from './Components/Signin/Signin';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
  apiKey: '356113ee31f34bf697994b5475bd2a04'
});

const particleOptions = {

  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300
      }
    },
    size: {
      value: 2
    },
    move: {
      enable: true,
      speed: 0.6
    }
  },

  interactivity: {
    events: {
      onhover: {
        enable: false,
        mode: "none"
      }
    }
  }
}

let checkPress = 0;
const zeroState = {
  input: '',
  ImageUrl: '',
  Box: {},
  name: '',
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    rank: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      ImageUrl: '',
      Box: {},
      name: '',
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        rank: ''
      }
    };
  }


  loadUser = (data) => {
    this.setState(
      {
        user:
        {
          id: data._id.toString(),
          name: data.username,
          email: data.email,
          rank: data.rank
        }
      })
  }
  updateRank = () => {
    console.log('inside update rank')
    fetch('https://face-recognition-api-priyansh.onrender.com/image', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'Invalid') {
          alert(data);
        }
      })
      .catch((err) => alert('something went wrong, retry!'))

    this.setState({
      user:
      {
        id: this.state.user.id,
        name: this.state.user.name,
        email: this.state.user.email,
        rank: parseInt(this.state.user.rank) + 1
      }
    })
  }
  displayCoordinates = (response) => {
    this.updateRank();
    const data = response.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('image-element');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: (width - (data.right_col * width)),
      bottomRow: (height - (data.bottom_row * height))
    }
  }


  FaceBox = (box, name) => {
    this.setState({ Box: box });

    let celebrity_name = name.charAt(0).toUpperCase() + name.slice(1);
    
    this.setState({ name: celebrity_name });

  }

  onInputChange = (event) => {

    this.setState({ input: event.target.value });
  }

  onButtonSubmit = (event) => {

    checkPress = 1;
    this.setState({ ImageUrl: this.state.input});
    
    app.models.initModel({ id: Clarifai.CELEBRITY_MODEL })
      .then(generalModel => {
        return generalModel.predict(this.state.input);
      })
      .then(response => {

        console.log(response);
        const name = response.outputs[0].data.regions[0].data.concepts[0].name;

        this.FaceBox(this.displayCoordinates(response), name)
      }

      )
      .catch(err => {
        
        console.log(err);
      });
      // console.log('here');
  
// URL of image to use. Change this to your image.
// const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

    // const raw = JSON.stringify({
    //   "user_app_id": {
    //     "user_id": "clarifai",
    //     "app_id": "main"
    //   },
    //   "inputs": [
    //       {
    //           "data": {
    //               "image": {
    //                   "url": this.state.input
    //               }
    //           }
    //       }
    //   ]
    // });
   
    // const requestOptions = {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Authorization': 'Key 5fa54d3c30a74e728372603e63ee627f'
    //     },
    //     body: raw
    // };

    // // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // // this will default to the latest version_id

    // fetch(`https://api.clarifai.com/v2/models/celebrity-face-detection/versions/2ba4d0b0e53043f38dbbed49e03917b6/outputs`, requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
  
  }
  
  componentDidMount() {
    checkPress = 0;
    
  }
  componentDidUpdate() {
    if (this.state.input.length < 20) {
      checkPress = 0;

    }
  }

  handleRouteChange = (newroute) => {
    checkPress = 0;
    if (newroute === 'signin') {
      this.setState(zeroState);
    }
    this.setState({ route: newroute });
  }
  render() {
    if (this.state.input.length < 10) {
      checkPress = 0;
    }
    return (

      <div>
        <Particles className="particle" params={particleOptions} />
        {this.state.route === 'signin' ?
          <SignIn loadUser={this.loadUser} newRoute={() => this.handleRouteChange('home')} goToRegister={() => this.handleRouteChange('register')} />
          : (
            this.state.route === 'home' ?
              <div>
                <Navigation curRoute={this.state.route} newRoute={() => this.handleRouteChange('signin')} />
                <Rank user={this.state.user} />
                <ImagelinkForm

                  onInputChange={this.onInputChange}
                  onButtonSubmit={(event) => this.onButtonSubmit(event)}
                />
                {checkPress && this.state.input.length > 10 ?
                  <ImageDisplay box={this.state.Box} PersonName={this.state.name} ImageUrl={this.state.input} />
                  : null
                }
              </div>
              :
              <div>
                <Navigation curRoute={this.state.route} newRoute={() => this.handleRouteChange('signin')} />
                <Register loadUser={this.loadUser} newRoute={() => this.handleRouteChange('home')} />
              </div>
          )
        }
      </div>
    );
  }
}
export default App;
