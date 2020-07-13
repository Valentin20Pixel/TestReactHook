import {createStackNavigator, createAppContainer} from 'react-navigation';
import Search from '../components/search';

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Rechercher"
    }
  }
})
export default createAppContainer(SearchStackNavigator)