import Ionicons from 'react-native-vector-icons/Ionicons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {Home, Profile} from '../../pages'
import {RootStackParamList, StackRoute} from '../../helpers'

const Tab = createBottomTabNavigator<RootStackParamList>()

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={StackRoute.HOME}
        options={{
          headerShown: false,
          tabBarIcon({color, size}) {
            return <Ionicons name="home" color={color} size={size} />
          },
        }}
        component={Home}
      />
      <Tab.Screen
        name={StackRoute.PROFILE}
        options={{
          headerShown: false,
          tabBarIcon({color, size}) {
            return <Ionicons name="person" color={color} size={size} />
          },
        }}
        component={Profile}
      />
    </Tab.Navigator>
  )
}

export default MainTabs
