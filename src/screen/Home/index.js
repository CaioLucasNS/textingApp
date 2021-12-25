import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {Container} from '../../components/Container';
import {getFeeds} from '../../services/getFeeds';
import colors from '../../styles/global';

export function Home({navigation, route}) {
  const {token} = route.params;

  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    handleGetFeeds();
  }, []);

  const handleGetFeeds = () => {
    getFeeds({token})
      .then(res => setFeeds(res))
      .catch(err => console.log('[error] ', err));
  };

  const formatterCreatedAt = date => {
    date = date.slice(0, 10).split('-');
    return `${date[2]}/${date[1]}/${date[0]}`;
  };

  const formatterUser = user => {
    user = user.toLowerCase();
    return user.replace(user[0], user[0].toUpperCase());
  };

  const RenderMessages = () => {
    return (
      <ScrollView>
        {!!feeds.length &&
          feeds.map(feed => (
            <View
              key={feed.id}
              style={{
                borderBottomWidth: 2,
                borderColor: colors.containerSecondary,
                marginBottom: 40,
              }}>
              <View style={styles.headerMessage}>
                <Text style={styles.text}>
                  {formatterUser(feed.author.username)}
                </Text>
                <Text style={styles.text}>-</Text>
                <Text style={styles.text}>
                  {formatterCreatedAt(feed.createdAt)}
                </Text>
              </View>

              <View style={styles.boxMessage}>
                <Text style={styles.textMessage}>{feed.content}</Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    marginHorizontal: 10,
                  }}>
                  <Icon
                    name="like1"
                    size={20}
                    color={feed.likes > 0 ? '#1588ed' : '#000'}
                    // onPress={}
                  />
                  <Text style={{marginHorizontal: 6}}>{feed.likes}</Text>
                </View>

                <View style={{flexDirection: 'row', padding: 10}}>
                  <Icon
                    name="heart"
                    size={20}
                    color={feed.loves > 0 ? '#ff5c68' : '#000'}
                    // onPress={}
                  />
                  <Text style={{marginHorizontal: 6}}>{feed.loves}</Text>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    );
  };

  return (
    <Container>
      <SafeAreaView>
        <RenderMessages />
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  headerMessage: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  boxMessage: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 10,
  },
  textMessage: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
});
