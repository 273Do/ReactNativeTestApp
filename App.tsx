import React, {useState} from 'react';
import {View, TextInput, Button, Text, Image, StyleSheet} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState<String>('');
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
      );
      setUserInfo(response.data);
    } catch (error) {
      // console.error('Error fetching user info:', error);
      setUserInfo(null);
    }
  };

  if (userInfo != null) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="GitHub IDを入力して下さい．"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <Button title="取得する" onPress={fetchUserInfo} />
        {userInfo && (
          <View style={styles.userInfoContainer}>
            <Image source={{uri: userInfo.avatar_url}} style={styles.avatar} />
            <Text style={styles.name}>{userInfo.name}</Text>
            <Text style={styles.username}>@{userInfo.login}</Text>
            <Text style={styles.followers}>
              フォロワー数: {userInfo.followers}
            </Text>

            <Text>公開リポジトリ: {userInfo.public_repos}</Text>
            <Text>
              場所:
              {userInfo.location ? (
                <Text>{userInfo.location}</Text>
              ) : (
                <Text>非公開</Text>
              )}
            </Text>
            <Text style={styles.bio}>{userInfo.bio}</Text>
            <Hyperlink linkDefault={true}>
              <Text>{userInfo.blog}</Text>
            </Hyperlink>
          </View>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="GitHub IDを入力して下さい．"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <Button title="取得する" onPress={fetchUserInfo} />
        <Text>存在しません．</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    marginTop: 100,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 90,
    marginTop: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -2,
  },
  username: {
    fontSize: 16,
    marginBottom: 5,
  },
  followers: {
    fontSize: 14,
    marginTop: 10,
  },
  bio: {marginTop: 20},
});

export default App;
