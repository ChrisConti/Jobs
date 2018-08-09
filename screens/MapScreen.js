import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button, Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';

class MapScreen extends Component {

  static navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({tintColor}) => (
        <Icon
            name='my-location'
            size={30}
            color={tintColor}
        />
    )
  }

  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onPressButton = () => {
    //console.log('pressButton');
    this.props.fetchjobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  render() {
    if(!this.state.mapLoaded){
      return (
        <View style={{ flex: 1, justifyContent: 'center' }} >
          <ActivityIndicator size='large' />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <MapView
          region={this.state.region}
          style={{flex: 1}}
        />
        <View>
          <Button
            icon={{name:'search', type:'evilicon', color:'white', size: 32 }}
            //buttonStyle={‌{ backgroundColor: "red" }}
            title='Search This Area'
            large
            onPress={this.onPressButton}
            buttonStyle={{
              backgroundColor: "#009688",
              //borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0
            }}
          />
        </View>
      </View>
    );
  }
}


export default connect(null, actions)(MapScreen);
