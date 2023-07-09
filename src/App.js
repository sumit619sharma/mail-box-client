import logo from './logo.svg';
import './App.css';
import Root from './component/root';
import { Provider } from 'react-redux';
import store from './redux-store';
function App() {
  return (
    <Provider store={store} >
    <Root/>
    </Provider>
    
  );
}

export default App;
