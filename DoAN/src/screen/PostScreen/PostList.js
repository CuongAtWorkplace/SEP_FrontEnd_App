import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import moment from 'moment';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import CommentList from './CommentList';
import { Modal } from 'react-native';
import { StatusBar } from 'react-native';


import myGlobalVariable from '../../global';

export default function PostList({ posts, updateLikes }) {
  const URL = myGlobalVariable;

  const formatDate = (dateString) => {
    return moment(dateString).format('LL'); // 'LL' là định dạng mặc định cho ngày tháng năm
  };

  const [createdByNames, setCreatedByNames] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isCommentListVisible, setIsCommentListVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState({}); // State mới để lưu trữ thông tin Like


  const handleCommentPress = (postId) => {

    setSelectedPostId(postId);
    setIsCommentListVisible(true);
  };

  const handleCancelCommentPress = () => {
    setIsCommentListVisible(false);
  };

  const handleLikeUpdate = (id) => {
    setLikedPosts((prevLikedPosts) => {
      const newLikedPosts = {
        ...prevLikedPosts,
        [id]: (prevLikedPosts[id] || 0) + 1,
      };
      console.log('New liked posts:', newLikedPosts);
      return newLikedPosts;
    });
  };


  const handleLike = async (id) => {
    try {
      const response = await fetch(`${URL}/api/Post/UpdateLikePost?Post=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {

        handleLikeUpdate(id);

        //updateLikes(id);

        console.log('Post liked successfully');
      } else {
        // Xử lý khi API gọi không thành công
        const errorData = await response.json();
        console.error('Failed to update like for post:', errorData.message);
      }
    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.error('Error calling UpdateLikePost API:', error.message);
    }
  };

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
    <SafeAreaView style={{ marginBottom: 70 }}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.postId.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
              <Text style={{ fontWeight: 'bold' }}># {item.contentPost}</Text>
            </View>
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
                  Created By: {createdByNames[item.createBy]}
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>

              <TouchableOpacity style={styles.buttonRow}
                onPress={() => handleLike(item.postId)}
                disabled={likedPosts[item.postId]} // Disable nếu đã thích
              >
                <AntDesign
                  name={likedPosts[item.postId] ? 'like1' : 'like2'} // Chọn icon tương ứng
                  size={24}
                  color={likedPosts[item.postId] ? 'blue' : 'black'} // Chọn màu tương ứng
                />

                {likedPosts[item.postId] > 0 ? (
                  <Text style={{ marginLeft: 10, color: 'blue' }}>
                    Like : {item.likeAmout + likedPosts[item.postId]}
                  </Text>
                ) : (
                  <Text style={{ marginLeft: 10, color: 'blue' }}>
                    Like : {item.likeAmout}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonRow} onPress={() => handleCommentPress(item.postId)}>
                <FontAwesome name="comment-o" size={24} color="blue" />
                <Text style={{ marginLeft: 10, color: "blue" }}>comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      />

      <Modal
        transparent={true}
        animationType='fade'
        visible={isCommentListVisible}
        onRequestClose={() => setIsCommentListVisible(false)}
      >
        <CommentList postId={selectedPostId} closeModal={handleCancelCommentPress} />
      </Modal>

    </SafeAreaView>
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
    fontSize: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

});
