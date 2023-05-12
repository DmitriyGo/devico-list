import {yupResolver} from '@hookform/resolvers/yup'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import * as yup from 'yup'

import {RootStackParamList} from '../Router'
import {login} from '../store/auth'
import {ILoginDTO} from '../store/auth/types'
import {useAppDispatch, useAppSelector} from '../store/hooks'

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>

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
      navigation.navigate('Home')
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
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    width: '80%',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
    color: '#1E90FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: -8,
    marginBottom: 8,
  },
})
