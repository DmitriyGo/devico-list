import {yupResolver} from '@hookform/resolvers/yup'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import * as yup from 'yup'
import {useForm, Controller} from 'react-hook-form'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'

import {RootStackParamList} from '../../App'
import {ILoginDTO} from '../store/auth/types'
import {useAppDispatch} from '../store/hooks'
import {login} from '../store/auth'

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

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginDTO>({
    resolver: yupResolver(schema),
  })

  const handleSignIn = (data: ILoginDTO) => {
    dispatch(login(data))
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
