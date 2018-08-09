import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';

class DeckScreen extends Component {

  static navigationOptions = {
    tabBarLabel: 'Jobs',
    tabBarIcon: ({tintColor}) => (
        <Icon
            name='description'
            size={30}
            color={tintColor}
        />
    )
  }

  renderCard(job){

    const initialRegion = {
      longitude: -118.4911912,
      latitude: 34.0194543,
      longitudeDelta: 0.045,
      latitudeDelta: 0.02
    };

    return (
      <Card
        key={job.id}
        title={job.title}
      >
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.created_at}</Text>
        </View>
        <Text>{job.Description}</Text>
      </Card>
    );
  }

  //when there os no more card to show
  renderNoMoreCards() {
    return (
      <Card title="All done!!">
      </Card>
    );
  }



  render() {
    const initialRegion = {
      longitude: -118.4911912,
      latitude: 34.0194543,
      longitudeDelta: 0.045,
      latitudeDelta: 0.02
    };

    return (
      <View>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
        />
        <MapView
          scrollEnabled={false}
          style={{ flex: 1}}
          cacheEnabled={Platform.Os === 'android' ? true : false }
          initialRegion={initialRegion}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  }
}

const mapStateToProps = state => {
  return { jobs: state.jobs };
}

export default connect(mapStateToProps, actions)(DeckScreen);
