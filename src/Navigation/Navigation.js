import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer, BottomTabBar, NavigationActions } from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NewsNavigator, ThemesNavigator } from "./Routes";
import { connect } from 'react-redux';
import TabBar from './TabBar';

const AppNavigator = createBottomTabNavigator({
  News: {
    screen: NewsNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-list-box" size={30} color={tintColor} />
      )
    }
  },
  Themes: {
    screen: ThemesNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-color-palette" size={30} color={tintColor} />
      )
    }
  },
}, {
    tabBarComponent: props => <TabBar {...props} />,
    initialRouteName: 'News',
  });

export const Nav = createAppContainer(AppNavigator);

class Navigator extends Component {
  render() {
    return (
      <Nav />
    )
  }
}

export default (Navigator)