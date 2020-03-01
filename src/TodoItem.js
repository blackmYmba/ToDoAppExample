import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, CheckBox } from 'react-native-elements';
import { Context } from '../context';

export const TodoItem = ({ item }) => {

  const { dispatch, showCompleted } = useContext(Context);
  if (!showCompleted && item.completed) {
    return null;
  }

  return (
    <ListItem
      leftElement={
        <CheckBox
          checked={item.completed}
          containerStyle={styles.checkBoxContainer}
          onPress={() => dispatch({
            type: 'CHECK_TODO_ITEM',
            payload: item.id
          })}
        />
      }
      rightIcon={{
        type: 'material',
        name: 'delete',
        color: 'red',
        onPress: () => dispatch({
          type: 'DELETE_TODO_ITEM',
          payload: item.id
        })
      }}
      title={item.title}
      titleStyle={item.completed ? styles.toDoTitleDone : styles.toDoTitle}
      containerStyle={styles.toDoItem}
    />
  )
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    padding: 0,
    margin: 0
  },
  toDoItem: {
    backgroundColor: '#E8E8E8',
    marginBottom: 5,
    borderRadius: 5
  },
  toDoTitle: {
    fontSize: 16
  },
  toDoTitleDone: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationColor: 'green',
    color: 'green'
  }
});

