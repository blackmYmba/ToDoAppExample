import React from 'react';
import { FlatList } from 'react-native';
import { TodoItem } from './TodoItem';

export const TodoList = ({ data }) => {

  const renderItem = ({ item }) => {
    return <TodoItem item={item} />
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
};
