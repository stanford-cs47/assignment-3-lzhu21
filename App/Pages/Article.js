import React, { useState, useEffect } from 'react';
import { StyleSheet, WebView, SafeAreaView } from 'react-native';

export default function App(props) {
  return(
    <SafeAreaView style = {styles.container}>
      <WebView source = {{uri: props.navigation.getParam('url')}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
