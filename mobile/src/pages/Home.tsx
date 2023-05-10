import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Button, Text} from 'react-native'

import {RootStackParamList} from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({navigation}: Props) => {
  return (
    <>
      <Text>Home</Text>
      <Button
        title="Go to SignIn"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button
        title="Go to SignUp"
        onPress={() => navigation.navigate('SignUp')}
      />
    </>
  )
}

export default Home
