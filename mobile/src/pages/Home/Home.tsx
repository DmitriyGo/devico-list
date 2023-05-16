import React, {useEffect} from 'react'
import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {
  Todo,
  addTodoAction,
  fetchTodosAction,
  removeTodoAction,
  updateTodoAction,
} from '../../store/todo'
import {setNextPage} from '../../store/todo/todoSlice'
import NewTodoForm from '../../components/NewTodoForm/NewTodoForm'
import {RootStackParamList, StackRoute} from '../../helpers'

import {styles} from './styles'

type Props = NativeStackScreenProps<RootStackParamList, StackRoute.HOME>

const Home = ({}: Props) => {
  const dispatch = useAppDispatch()
  const {items, total, isLoading, currentPage} = useAppSelector(
    state => state.todo,
  )

  useEffect(() => {
    dispatch(fetchTodosAction())
  }, [currentPage])

  const handleStatusChange = (item: Todo): void => {
    dispatch(updateTodoAction({...item, completed: !item.completed}))
  }

  const handleDelete = (item: Todo): void => {
    dispatch(removeTodoAction(item._id))
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
    dispatch(addTodoAction(name))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      <NewTodoForm onCreate={handleCreate} />
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

export default Home
