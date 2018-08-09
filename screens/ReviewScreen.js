import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, Platform } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      headerTitle: "Review Jobs",
      headerRight: (
        <Button
          title="Settings"
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0,122,255,1)"
          onPress={() => {
            navigation.navigate("settings");
          }}
        />
      )
    });

  renderLikeJobs = () => {
    return this.props.likedJobs.map(job => {

      const initialRegion = {
        longitude: -118.4911912,
        latitude: 34.0194543,
        longitudeDelta: 0.045,
        latitudeDelta: 0.02
      };

      return (
        <Card key={job.id} title={job.title}>
          <View style={{ height: 200}}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            >
            </MapView>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.id}</Text>
            </View>
            <Button
              title='Apply Now!'
              backgroundColor='#03A9F4'
              onPress={() => Linking.openURL(job.url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikeJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

const mapStateToProps = state => {
  return { likedJobs: state.likedJobs};
}

export default connect(mapStateToProps)(ReviewScreen);
