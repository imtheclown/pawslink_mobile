/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import BottomTabs from "./navigation/BottomTabs";
import { NavigationContainer } from '@react-navigation/native';
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabs/>
    </NavigationContainer>
  );
}

export default App;
