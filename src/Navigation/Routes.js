import { createStackNavigator } from "react-navigation";
import NewsScreen from '../Containers/NewsScreen'
import ThemesScreen from '../Containers/ThemesScreen'

export const NewsNavigator = createStackNavigator({
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: {
      title: 'Новости',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
      }
    }
  }
})

export const ThemesNavigator = createStackNavigator({
  ThemesScreen: {
    screen: ThemesScreen,
    navigationOptions: {
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
      }
    }
  }
})