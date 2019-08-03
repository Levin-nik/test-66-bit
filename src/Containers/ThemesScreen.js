import React from 'react';
import { View, ActivityIndicator, Text, AsyncStorage, TouchableOpacity } from 'react-native'
import { Style } from './Styles/ThemesStyle'
import ThemeButton from '../Components/ThemeButton';
import { connect } from 'react-redux';
import { getTheme } from '../Redux/Actions/Themes';
const NetInfo = require("@react-native-community/netinfo");

const buttons = [
  { title: 'Тема 1', name: 'dark' },
  { title: 'Тема 2', name: 'light' },
  { title: 'Тема 3', name: 'blue' }
]

class ThemesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Темы'),
      headerStyle: {
        backgroundColor: navigation.getParam('mainColor', 'rgb(218,227,243)')
      },
      headerTintColor: navigation.getParam('textColor', 'black')
    }
  }

  state = {
    connected: true
  }

  componentDidMount() {
    const { theme, navigation } = this.props
    if (theme) {
      navigation.setParams({
        title: theme.title,
        mainColor: theme.mainColor,
        textColor: theme.textColor
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { theme, navigation } = this.props
    if (theme !== prevProps.theme && theme) {
      AsyncStorage.setItem('theme', JSON.stringify(theme))
      navigation.setParams({
        title: theme.title,
        mainColor: theme.mainColor,
        textColor: theme.textColor
      })
    }
  }

  getTheme = (item) => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ connected: true })
        this.props.getTheme(item.name)
      } else {
        this.setState({ connected: false })
      }
    })
  }

  refresh = () => this.setState({ connected: true })

  renderContent = () => {
    const { theme } = this.props
    return (
      <View
        style={[
          Style.container,
          theme && { backgroundColor: theme.secondColor }
        ]}
      >
        {
          buttons.map((el, index) =>
            <ThemeButton
              theme={theme}
              key={index}
              item={el}
              onSelectTheme={this.getTheme}
            />
          )
        }
      </View>
    )
  }

  renderError = (error) =>
    <View style={Style.flex}>
      <Text style={Style.text}>
        Произошла ошибка при получении темы: {error}
      </Text>
      {this.renderRefreshButton()}
    </View>

  renderDisconnect = () =>
    <View style={Style.flex}>
      <Text style={Style.text}>
        Подключение к интернету отсутствует
      </Text>
      {this.renderRefreshButton()}
    </View>

  renderRefreshButton = () =>
    <TouchableOpacity style={Style.button} onPress={this.refresh}>
      <Text style={Style.text}>
        Обновить
      </Text>
    </TouchableOpacity>

  render() {
    const { fetchingTheme, error } = this.props
    const { connected } = this.state
    return fetchingTheme
      ? <ActivityIndicator size='large' style={Style.flex} />
      : error
        ? this.renderError(error)
        : !connected
          ? this.renderDisconnect()
          : this.renderContent()
  }
}

const mapStateToProps = ({ Themes }) => {
  return {
    fetchingTheme: Themes.fetchingTheme,
    error: Themes.error,
    theme: Themes.theme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTheme: (name) => dispatch(getTheme(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemesScreen)