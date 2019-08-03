import React, { Component } from 'react'
import { BottomTabBar } from 'react-navigation';
import { connect } from 'react-redux';

class TabBar extends Component {
  render() {
    const { theme } = this.props
    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={theme ? theme.textColor : 'black'}
        inactiveTintColor={theme ? theme.secondColor : 'gray'}
        style={{
          backgroundColor: theme ? theme.mainColor : 'rgb(218,227,243)',

        }}
      />
    )
  }
}

const mapStateToProps = ({ Themes }) => {
  return {
    theme: Themes.theme
  }
}

export default connect(mapStateToProps)(TabBar)