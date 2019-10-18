import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Linking
} from 'react-native';
import { material, iOSUIKit, human } from 'react-native-typography'

export default function Article(props) {
  return (
    <TouchableOpacity style={styles.article} onPress={() => Linking.openURL(props.url)}>
      <Text style={human.title2}>{props.title}</Text>
      <Text style={iOSUIKit.subhead}>{props.snippet}</Text>
      <Text style={iOSUIKit.footnoteEmphasized}>{props.byline}</Text>
      <Text style={material.caption}>{props.date}</Text>
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  article: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#eee',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20
  },
});
