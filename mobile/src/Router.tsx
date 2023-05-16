import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {SignUp, SignIn} from './pages'
import {useAppSelector} from './store/hooks'
import {Loader, MainTabs} from './components'
import {RootStackParamList, StackRoute} from './helpers'

const Stack = createNativeStackNavigator<RootStackParamList>()

const Router = () => {
  const {user, isLoading} = useAppSelector(state => state.auth)

  if (isLoading) {
    return <Loader />
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name={StackRoute.MAIN_TABS}
            component={MainTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={StackRoute.SIGN_IN}
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={StackRoute.SIGN_UP}
            component={SignUp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name={StackRoute.SIGN_IN}
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={StackRoute.SIGN_UP}
            component={SignUp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default Router
