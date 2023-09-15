import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import App from './App';
import { takeEvery , put } from 'redux-saga/effects'

// this startingPlantArray should eventually be removed
//const startingPlantArray = [
  // { id: 1, name: 'Rose' },
  // { id: 2, name: 'Tulip' },
  // { id: 3, name: 'Oak' }
//];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};

function* fetchPlants(){
  try{
      const plantResponse = yield axios.get('/api/plant');
      yield put({ type:'ADD_PLANT' , payload: plantResponse.data })
  } catch (error) {
      console.log('error fetching plants', error);
  }
}

function* rootSaga() {
  yield takeEvery('FETCH_PLANT' , fetchPlants)

}


const sagaMiddleware = createSagaMiddleware(rootSaga);
const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger),
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);