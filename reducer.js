export default function(state, action) {
  switch (action.type) {
    case 'SET_TODOS':
      state = action.payload;
      return state;
    case 'CHECK_TODO_ITEM':
      return state.map((i) => {
        if (i.id === action.payload) {
          i.completed = !i.completed
        }
        return i
      });
    case 'DELETE_TODO_ITEM':
      return state.filter(i => i.id !== action.payload);
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          completed: false
        }
      ];
    default:
      return state
  }
}
