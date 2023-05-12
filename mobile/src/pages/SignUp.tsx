import {yupResolver} from '@hookform/resolvers/yup'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import * as yup from 'yup'

import {RootStackParamList} from '../Router'
import {register} from '../store/auth'
import {useAppDispatch, useAppSelector} from '../store/hooks'
import {IRegisterFormDTO} from '../store/auth/types'

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>

const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup
    .string()
    .min(6, 'Min length 6 characters')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
})

const SignUp = ({navigation}: Props) => {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state => state.auth)

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IRegisterFormDTO>({
    resolver: yupResolver(schema),
  })

  const handleSignUp = (data: IRegisterFormDTO) => {
    dispatch(register(data))
  }

  useEffect(() => {
    if (user) {
      navigation.navigate('Home')
    }
  }, [navigation, user])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <Controller
        control={control}
        name="confirm_password"
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.confirm_password && (
        <Text style={styles.errorText}>{errors.confirm_password.message}</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleSignUp)}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp

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
