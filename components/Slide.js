import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slide extends Component {
  renderButton(index) {
    if(index === this.props.data.length -1) {
      return (
        <Button
          buttonStyle={styles.buttonStyle}
          title="Onwrads!!"
          raised
          onPress={this.props.onComplete}
        />
      );
    }
  }

  renderSlides(){
    console.log(this.props.data);
    return this.props.data.map((slide, i) => {
      return (
        <View key={slide.text} style={[styles.slideStyle, {backgroundColor: slide.color }]}>
          <Text style={styles.textSlide}>{slide.text}</Text>
          //{this.renderButton(i)}
        </View>
      );
    });
  }
  render(){
    return (
      <ScrollView
        horizontal
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textSlide: {
    fontSize: 30,
    color: 'white'
  },
  buttonStyle:{
    backgroundColor: '#028801',
    marginTop: 15
  }
}

export default Slide;
