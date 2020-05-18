/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/


import React from 'react';
import { View } from 'react-native';
import RandomName from './App/Pages/Home'
import LogoTitle from './App/Components/Logo'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Article from './App/Components/Article'

const stackNav = createStackNavigator({
  home: {screen: Home},
  article: {screen: Article}
},
{
  defaultNavigationOptions: {
    headerTitle: () => (
      <View>
        <LogoTitle/>
      </View>),
  }
});

const myApp = createAppContainer(stackNav);
export default MyApp;
