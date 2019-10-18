/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TextInput, Button, Alert, Keyboard, TouchableOpacity, TouchableWithoutFeedback, FlatList, Linking, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'
import { material, iOSUIKit, human } from 'react-native-typography'

import News from './App/Components/News'
import Search from './App/Components/Search'
import Article from './App/Components/Article'

export default class App extends React.Component {

  state = {
    loading: false,
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
    this.setState({loading: false, articles: resultArticles, searchText: ''})
  }

  renderArticle = (item) => {
    return(<Article
      title={item.title}
      snippet={item.snippet}
      byline={item.byline}
      date={item.date}
      url={item.url}
    />)
  }

  keyExtractor = index => {
    return index.toString();
  }

  render() {
    const {articles, loading} = this.state;

    if(this.state.loading) {
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
                onSubmitEditing={() => this.loadArticles(this.state.searchText)}
                value={this.state.searchText}
              />
              <TouchableOpacity
                onPress={() => this.loadArticles(this.state.searchText)}
                style={styles.button}>
                <FontAwesome
                  name='search'
                  size={25}
                  color='#58b1cc'
                />
              </TouchableOpacity>
            </View>

            <View style={styles.loading}>
              <ActivityIndicator animating={true} color='#bbb' size='large' />
            </View>

          </SafeAreaView>
        </TouchableWithoutFeedback>
      )
    } else {
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
                onSubmitEditing={() => this.loadArticles(this.state.searchText)}
                value={this.state.searchText}
              />
              <TouchableOpacity
                onPress={() => this.loadArticles(this.state.searchText)}
                style={styles.button}>
                <FontAwesome
                  name='search'
                  size={25}
                  color='#58b1cc'
                />
              </TouchableOpacity>
            </View>

            <View style={styles.flatlist}>
              <FlatList
                data={this.state.articles}
                renderItem={({ item }) => this.renderArticle( item )}
                keyExtractor={(item, index) => this.keyExtractor(index)}
              />
            </View>

          </SafeAreaView>
        </TouchableWithoutFeedback>
      );
    }
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
  flatlist: {
    flex: .7,
    top: 110,
    width: '100%',
    height: '80%'
  },
  article: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#eee',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20
  },
  loading: {
    flex: .7,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
