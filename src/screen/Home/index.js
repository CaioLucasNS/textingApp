import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ButtonComponent} from '../../components/ButtonComponent';

import {Container} from '../../components/Container';
import {TextInput} from '../../components/TextInput';
import {getFeeds} from '../../services/getFeeds';
import {postFeed} from '../../services/postFeed';

import colors from '../../styles/global';

export function Home({navigation, route}) {
  const {token} = route.params;

  const [feeds, setFeeds] = useState([]);
  const [postMessage, setPostMessage] = useState(null);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    handleGetFeeds();
  }, []);

  useEffect(() => {
    console.log('re-rendering ::Home::');
    handleGetFeeds();
  }, [sendingMessage])

  const handleGetFeeds = async () => {
    await getFeeds({token: token})
      .then(res => setFeeds(res))
      .catch(err => console.log('[error] ', err));
  };

  const handlePostFeed = () => {
    postFeed({token: token, content: postMessage})
      .then(res => res)
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

  if (feeds && feeds.length > 0) {
    return (
      <Container>
        <View style={styles.postMessageContainer}>
          <TextInput
            placeholder="O que você está pensando?"
            onChangeText={text => setPostMessage(text)}
            value={postMessage}
            style={{marginBottom: 10, backgroundColor: '#fff'}}
          />
          <ButtonComponent
            style={{width: '30%', alignSelf: 'flex-end'}}
            onPress={() => {
              setSendingMessage(!sendingMessage);
              handlePostFeed();
              setPostMessage(null);
            }}>
            Enviar
          </ButtonComponent>
        </View>

        <RenderMessages />
      </Container>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.containerPrimary,
        }}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postMessageContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: colors.containerSecondary,
    borderRadius: 10,
  },
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
