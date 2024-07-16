/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AppNavigation from './navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AddAnimalScreen from './screens/admin/AddAnimalScreen';
import AdminStackNavigator from './navigation/admin/AdminNavigationStack';
function App(): React.JSX.Element {
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <NavigationContainer>
    //     {/* <AppNavigation/> */}
    //     <AdminBottomTabNavigation/>
    //   </NavigationContainer>
    // </GestureHandlerRootView>
    <NavigationContainer>
      <AdminStackNavigator/>
    </NavigationContainer>
  );
}

export default App;

