/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import BottomTabs from "./navigation/BottomTabs";
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomTabs/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
