const initialState = { test: {} };

export default function reducer(state = initialState, action={}){
  const { type, payload } = action;

  switch (type) {
    case '1':
      return { type: 'test', test: payload }
    default:
      return state;
  }
}
