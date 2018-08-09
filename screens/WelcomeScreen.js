import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slide from '../components/Slide';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
  {text: "Good Morning", color: 'blue'},
  {text: "Good afternoon", color: 'red'},
  {text: "Good Night", color: 'yellow'}
];

class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    if(token){
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({token: false});
    }
  }

  onCompleteLastSlide = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if(_.isNull(this.state.token)){
      return <AppLoading />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Slide data={SLIDE_DATA} onComplete={this.onCompleteLastSlide}/>
      </View>
    );
  }
}

export default WelcomeScreen;
