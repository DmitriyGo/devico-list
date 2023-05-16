import {useState} from 'react'
import {View, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {styles} from './styles'

interface INewTodoForm {
  onCreate: (name: string) => void
}

const NewTodoForm = ({onCreate}: INewTodoForm) => {
  const [newTodoName, setNewTodoName] = useState<string>('')

  const handleNewTodoSubmit = () => {
    if (!newTodoName.trim()) {
      return
    }

    onCreate(newTodoName.trim())
    setNewTodoName('')
  }

  return (
    <View style={styles.newTodoContainer}>
      <TextInput
        style={styles.newTodoInput}
        placeholder="Add new todo"
        value={newTodoName}
        onChangeText={setNewTodoName}
        onSubmitEditing={handleNewTodoSubmit}
      />
      <TouchableOpacity
        style={styles.newTodoButton}
        onPress={handleNewTodoSubmit}>
        <Icon name="plus-circle" size={32} color="#000" />
      </TouchableOpacity>
    </View>
  )
}

export default NewTodoForm
