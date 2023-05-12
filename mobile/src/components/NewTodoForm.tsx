import {useState} from 'react'
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

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

const styles = StyleSheet.create({
  newTodoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  newTodoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  newTodoButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 4,
  },
  newTodoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default NewTodoForm
