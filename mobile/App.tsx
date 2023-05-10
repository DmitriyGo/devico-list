import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';

import Home from './src/pages/Home';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';

import store from './src/store/store';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={Home}
          />
          <Stack.Screen
            name="SignIn"
            options={{headerShown: false}}
            component={SignIn}
          />
          <Stack.Screen
            name="SignUp"
            options={{headerShown: false}}
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
