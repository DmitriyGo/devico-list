import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Text} from 'react-native'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import {useAppSelector} from './store/hooks'

export type RootStackParamList = {
  Home: undefined
  SignIn: undefined
  SignUp: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Router = () => {
  const {user, isLoading} = useAppSelector(state => state.auth)

  if (isLoading) {
    return <Text>Loading</Text>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user && (
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={Home}
          />
        )}
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
  )
}

export default Router
