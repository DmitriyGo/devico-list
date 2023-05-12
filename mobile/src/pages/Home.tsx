import React, {useEffect} from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {useAppDispatch, useAppSelector} from '../store/hooks'
import {Todo, addTodo, fetchTodos, removeTodo, updateTodo} from '../store/todo'
import {Button} from 'react-native'
import {logout} from '../store/auth'
import {setNextPage} from '../store/todo/todoSlice'
import NewTodoForm from '../components/NewTodoForm'

const Home = () => {
  const dispatch = useAppDispatch()
  const {items, total, isLoading, currentPage} = useAppSelector(
    state => state.todo,
  )

  useEffect(() => {
    dispatch(fetchTodos())
  }, [currentPage])

  const handleStatusChange = (item: Todo): void => {
    dispatch(updateTodo({...item, completed: !item.completed}))
  }

  const handleDelete = (item: Todo): void => {
    dispatch(removeTodo(item._id))
  }

  const handleEndReached = () => {
    if (items.length < total) {
      dispatch(setNextPage())
    }
  }

  const renderItem = ({item}: {item: Todo}) => {
    const statusColor = item.completed ? '#98FB98' : '#FFC0CB'

    return (
      <View style={[styles.todo, {backgroundColor: statusColor}]}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleStatusChange(item)}>
            <Icon
              name={item.completed ? 'check-circle' : 'circle'}
              size={24}
              color={item.completed ? '#008000' : '#FF0000'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Icon name="trash-2" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  function handleCreate(name: string): void {
    dispatch(addTodo(name))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      <NewTodoForm onCreate={handleCreate} />
      <Button title="logout" onPress={() => dispatch(logout())} />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isLoading ? <Text style={styles.loading}>Loading...</Text> : null
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  todo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 18,
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loading: {
    textAlign: 'center',
    paddingVertical: 10,
  },
})

export default Home
