import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
    };
  }
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profile: [...prevState.profile, profileData]
    }));
  };
  render() {
    return (
      <div className="App">
        <h1>The Github Card App</h1>
        <Form onSubmit = {this.addNewProfile}/>
        <CardList profile={this.state.profile}/>  
      </div>
    );
  }
}

class Card extends Component {
  render() {
    const profile = this.props;
    return(
      <div className='github-profile'>
        <img src={profile.avatar_url} />
        <div className='info'>
          <div className='Name'>{profile.name}</div>
          <div className='Company'>{profile.company}</div>
        </div>
      </div>
    );
  }
}

//card data in an array
const CardList = (props) => (
  <div>
    {props.profile.map(profile => <Card key = {profile.id} {...profile}/>)}
  </div>
);

/*input form
fetching data from github api
*/
class Form extends Component {
  state = {
    userName: '',
  };
   handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' });
  };
  render() {
    return(
    <form onSubmit={this.handleSubmit}>
        <input 
        type='text'
        value={this.state.userName} 
        onChange = { event => this.setState({userName: event.target.value})}
        placeholder='Github username' 
        required />
        <button>Add new card</button>
      </form>
    );
  }
}
export default App;
