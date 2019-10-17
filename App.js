/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TextInput, Button, Alert, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'

import News from './App/Components/News'
import Search from './App/Components/Search'

export default class App extends React.Component {

  state = {
    loading: true,
    articles : [],
    searchText: '',
    category: ''
  }

  onChangeText = text => {
   this.setState({searchText: text});
  }

  componentDidMount() {

    //uncomment this to run an API query!
    //this.loadArticles();
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    console.log(resultArticles);
    this.setState({loading: false, articles: resultArticles})
  }

  render() {
    const {articles, loading} = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>


          <View style={styles.topbar}>
            <Image style={styles.logoimg} source={Images.logo}/>
          </View>


            <View style={styles.searchbar}>
              <TextInput
                style={styles.textinput}
                onChangeText={text => this.onChangeText(text)}
                onSubmitEditing={text => this.loadArticles(text)}
                value={this.state.searchText}
              />
              <TouchableOpacity
                onPress={this.loadArticles}
                style={styles.button}>
                <FontAwesome
                  name='search'
                  size={25}
                  color='#58b1cc'
                />
              </TouchableOpacity>
            </View>


          {/*And some news*/}

          {/*Though, you can style and organize these however you want! power to you 😎*/}

          {/*If you want to return custom stuff from the NYT API, checkout the APIRequest file!*/}

        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topbar: {
    flex: 1,
    top: 35,
    position: 'absolute',
  },
  logoimg: {
    width: 0.9 * width,
    height: 100,
    resizeMode: 'contain',
  },
  searchbar: {
    flex: 1,
    position: 'absolute',
    top: 140,
    flexDirection: 'row',
    borderRadius: 15,
    height: 50,
    backgroundColor: '#efefef',
    padding: 10,
    paddingLeft: 20,
  },
  textinput: {
    width: 0.75 * width,
  },
  button: {
    height: 25,
    paddingRight: 10
  },
});
