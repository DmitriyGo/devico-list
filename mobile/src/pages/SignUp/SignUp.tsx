import {useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import * as yup from 'yup'

import {yupResolver} from '@hookform/resolvers/yup'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {register} from '../../store/auth'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {IRegisterFormDTO} from '../../store/auth/types'
import {RootStackParamList, StackRoute} from '../../helpers'

import {styles} from './styles'

type Props = NativeStackScreenProps<RootStackParamList, StackRoute.SIGN_UP>

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
      navigation.navigate(StackRoute.HOME)
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
      <TouchableOpacity onPress={() => navigation.navigate(StackRoute.SIGN_IN)}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp
