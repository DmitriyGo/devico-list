import {Text, View} from 'react-native'
import {styles} from './styles'

const Loader = () => {
  return (
    <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

export default Loader
