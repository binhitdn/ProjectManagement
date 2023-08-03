import * as React from 'react';
import {Provider} from 'react-redux';
import store from '@redux/store/store';
import Main from './Main';
import {PaperProvider} from 'react-native-paper';
const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </Provider>
  );
};
export default App;
