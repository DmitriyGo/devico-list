import {useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import * as yup from 'yup'

import {yupResolver} from '@hookform/resolvers/yup'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {login} from '../../store/auth'
import {ILoginDTO} from '../../store/auth/types'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {RootStackParamList, StackRoute} from '../../helpers'

import {styles} from './styles'

type Props = NativeStackScreenProps<RootStackParamList, StackRoute.SIGN_IN>

const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup
    .string()
    .min(6, 'Min length 6 characters')
    .required('Password is required'),
})

const SignIn = ({navigation}: Props) => {
  const dispatch = useAppDispatch()
  const {user, error} = useAppSelector(state => state.auth)

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<ILoginDTO>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', 'Invalid login or password')
    }
  }, [error])

  useEffect(() => {
    if (user) {
      navigation.navigate(StackRoute.HOME)
    }
  }, [navigation, user])

  const handleSignIn = (data: ILoginDTO) => {
    dispatch(login(data))

    setValue('password', '')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Controller
        control={control}
        name="login"
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Login"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.login && (
        <Text style={styles.errorText}>{errors.login.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleSignIn)}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(StackRoute.SIGN_UP)}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn
