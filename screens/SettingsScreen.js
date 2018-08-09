import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SettingsScreen extends Component {
  render() {
    return (
      <View>
        
        <Button
          icon={{name:'delete-forever', type:'MaterialCommunityIcons', color:'white', size: 32 }}
          //buttonStyle={‌{ backgroundColor: "red" }}
          title='Delete List Jobs'
          large
          onPress={this.props.clearLikeJobs}
          buttonStyle={{
            backgroundColor: "red",
            //borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
            //position: 'absolute',
            bottom: 20,
            top: 20,
            left: 0,
            right: 0
          }}
        />
      </View>
    );
  }
}

export default connect(null, actions)(SettingsScreen);
