/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AppNavigation from './navigation/AppNavigation';
import AdminBottomTabNavigation from './navigation/AdminNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <AppNavigation/> */}
        <AdminBottomTabNavigation/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

