import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import moment from 'moment';

import myGlobalVariable from '../../global';

export default function PostList({ posts }) {
  const URL = myGlobalVariable;

  const formatDate = (dateString) => {
    return moment(dateString).format('LL'); // 'LL' là định dạng mặc định cho ngày tháng năm
  };

  const [createdByNames, setCreatedByNames] = useState({});

  const GetName = async (id) => {
    try {
      const response = await fetch(URL + '/api/User/GetStudentById/GetStudentById/' + id);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data[0].fullName;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  useEffect(() => {
    // Một hàm để lấy tên người tạo cho từng bài đăng
    const fetchCreatedByNames = async () => {
      const names = {};
      for (const post of posts) {
        const name = await GetName(post.createBy);
        names[post.createBy] = name;
      }
      setCreatedByNames(names);
    };

    fetchCreatedByNames();
  }, [posts]);

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.postId.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ fontSize: 15, marginTop: 10, fontWeight: 'bold' }}>{item.description}</Text>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: URL + '/api/Post/GetImage/' + item.postId }}
              />
            </View>
            <View style={styles.botContent}>
              <View style={styles.leftText}>
                <Text style={styles.leftTextContent}>{formatDate(item.createDate)}</Text>
              </View>
              <View style={styles.rightText}>
                <Text style={styles.rightTextContent}>
                  Created By: {createdByNames[item.createBy] }
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    marginTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
  },
  botContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftText: {
    flex: 1,
  },
  rightText: {
    flex: 1,
  },
  leftTextContent: {
    textAlign: 'left',
  },
  rightTextContent: {
    textAlign: 'right',
    fontSize:10,

  },
});
