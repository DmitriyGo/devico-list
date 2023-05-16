import React from 'react'
import {View, Text, Button} from 'react-native'

import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {logout} from '../../store/auth'
import {RootStackParamList, StackRoute} from '../../helpers'

import {styles} from './styles'

type Props = NativeStackScreenProps<RootStackParamList, StackRoute.PROFILE>

const Profile = ({}: Props) => {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state => state.auth)
  const {total, active, completed} = useAppSelector(state => state.todo)

  return (
    <View style={styles.container}>
      <View style={styles.logout}>
        <Text style={styles.loginText}>User login: {user?.login}</Text>

        <Button title="Logout" onPress={() => dispatch(logout())} />
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Total Todos: {total}</Text>
        <Text style={styles.statsText}>Active Todos: {active}</Text>
        <Text style={styles.statsText}>Completed Todos: {completed}</Text>
      </View>
    </View>
  )
}

export default Profile
