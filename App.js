import React, { useState, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Alert,
} from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TodoList } from './src/TodoList';
import { Context } from './context';
import reducer from './reducer';

const App = () => {

  const [state, dispatch] = useReducer(reducer, []);

  const [todoTitle, setTodoTitle] = useState('');

  const [showCompleted, setShowCompleted] = useState(true);

  useEffect( () => {
    Icon.loadFont();
    getStorageTodos();
  }, []);

  const getStorageTodos = () => {
    AsyncStorage.getItem('todos')
      .then(itemValue => JSON.parse(itemValue) || [])
      .then(todos => dispatch({
        type: 'SET_TODOS',
        payload: todos
      }))
  };

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(state))
  }, [state]);


  const addTodo = () => {
    if (!todoTitle) {
      Alert.alert('Внимание', 'Название не должно быть пустым');
      return;
    }
    dispatch({
      type: 'ADD_TODO',
      payload: todoTitle
    });
    setTodoTitle('')
  };

  return (
    <Context.Provider value={{ dispatch, showCompleted }}>
      <SafeAreaView>
        <View style={styles.container}>
        <Text style={styles.headerTitle}>To Do App</Text>
        <Input
          placeholder="Введите новое задание..."
          value={todoTitle}
          onChangeText={(e) => setTodoTitle(e)}
          onSubmitEditing={addTodo}
          containerStyle={styles.input}
          returnKeyType="done"
        />
        {state && state.length ? (
          <CheckBox
            right
            iconRight
            containerStyle={styles.checkBoxContainer}
            checked={showCompleted}
            title='Показывать завершенные'
            onPress={() => setShowCompleted(!showCompleted)}
          />
        ) : null}
        <TodoList data={state} />
        </View>
      </SafeAreaView>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    textAlign: 'right'
  },
  container: {
    padding: 10
  },
  headerTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15
  }
});

export default App;
