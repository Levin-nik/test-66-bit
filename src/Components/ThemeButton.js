import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Style } from './Styles/ThemeButtonStyle'

export default class ThemeButton extends Component {
  render() {
    const { item, index, onSelectTheme, theme } = this.props
    return (
      <TouchableOpacity
        key={index}
        style={[
          Style.button,
          theme && { borderColor: theme.secondColor, backgroundColor: theme.mainColor }
        ]}
        onPress={() => onSelectTheme(item)}
      >
        <Text
          style={[
            Style.text,
            theme && { color: theme.textColor }
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

    )
  }
}
