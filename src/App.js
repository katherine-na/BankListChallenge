import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BankList from './components/BankList/BankList';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Bank List</h1>
        <BankList />
      </div>
    </Provider>
  );
};

export default App;
