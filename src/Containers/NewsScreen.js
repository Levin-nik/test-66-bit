import React from 'react';
import {
  FlatList,
  ScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
  View,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import Post from "../Components/Post";
import { getNews, setNews } from "../Redux/Actions/News";
import { setTheme } from "../Redux/Actions/Themes";
import { Style } from "./Styles/NewsStyle";
import Database from '../Database';
const NetInfo = require("@react-native-community/netinfo");

const db = new Database();

class NewsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: navigation.getParam('mainColor', 'rgb(218,227,243)')
      },
      headerTintColor: navigation.getParam('textColor', 'black')
    }
  }

  state = {
    emptyData: false,
    loading: false
  }

  componentDidMount() {
    this.getTheme()
    this.getData()
  }

  componentDidUpdate(prevProps) {
    const { theme, navigation, news } = this.props
    if (theme !== prevProps.theme && theme) {
      navigation.setParams({
        title: theme.title,
        mainColor: theme.mainColor,
        textColor: theme.textColor
      })
    }
    if (news !== prevProps.news && news) {
      db.addNews(news)
    }
  }

  componentWillUnmount() {
    db.initDB().then((db) => {
      db.closeDatabase(db)
    })
  }

  getTheme = async () => {
    const data = await AsyncStorage.getItem('theme')
    if (data) {
      let theme = JSON.parse(data)
      this.props.setTheme(theme)
    }
  }

  getData = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ emptyData: false })
        this.props.getNews()
      } else {
        this.setState({ loading: true })
        db.getNews().then((data) => {
          if (data && data.length > 0) {
            ToastAndroid.show('Показаны сохраненные новости', ToastAndroid.LONG)
            this.setState({ emptyData: false, loading: false })
            this.props.setNews(data)
          } else {
            this.setState({ emptyData: true, loading: false })
          }
        })
      }
    })
  }

  renderPost = ({ item, index }) => (
    <Post
      theme={this.props.theme}
      key={index}
      item={item}
    />
  )

  renderContent = () => {
    const { news, theme, fetchingNews } = this.props
    const { loading } = this.state
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={fetchingNews || loading}
            onRefresh={this.getData}
          />
        }
      >
        {news
          ? <FlatList
            data={news}
            style={theme && { backgroundColor: theme.mainColor }}
            renderItem={this.renderPost}
            keyExtractor={(item) => item.id.toString()}
          />
          : null}
      </ScrollView>
    )
  }

  renderError = (error) =>
    <View style={Style.flex}>
      <Text style={Style.text}>
        Произошла ошибка при получении новостей: {error}
      </Text>
      {this.renderRefreshButton()}
    </View>

  renderEmptyData = () =>
    <View style={Style.flex}>
      <Text style={Style.text}>
        Подключение к интернету отсутствует и нет сохраненных новостей
      </Text>
      {this.renderRefreshButton()}
    </View>

  renderRefreshButton = () =>
    <TouchableOpacity style={Style.button} onPress={this.getData}>
      <Text style={Style.text}>
        Обновить
      </Text>
    </TouchableOpacity>

  render() {
    const { fetchingNews, error } = this.props
    const { emptyData, loading } = this.state
    return fetchingNews || loading
      ? <ActivityIndicator size='large' style={Style.flex} />
      : error
        ? this.renderError(error)
        : emptyData
          ? this.renderEmptyData()
          : this.renderContent()
  }
}

const mapStateToProps = ({ News, Themes }) => {
  return {
    news: News.items,
    fetchingNews: News.fetchingNews,
    error: News.error,
    theme: Themes.theme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNews: () => dispatch(getNews()),
    setNews: (news) => dispatch(setNews(news)),
    setTheme: (theme) => dispatch(setTheme(theme))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen)