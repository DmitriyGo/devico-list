import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
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
