import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Style } from './Styles/PostStyle'

class Post extends React.PureComponent {
  render() {
    const { theme, item } = this.props
    const { content, title } = item
    return (
      <ScrollView>
        <View style={[Style.container, theme && { backgroundColor: theme.secondColor }]}>
          <Text style={[Style.title, theme && { color: theme.textColor }]}>
            {title.trim()}
          </Text>
          <Text style={[Style.text, theme && { color: theme.textColor }]}>
            {content.trim()}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default Post