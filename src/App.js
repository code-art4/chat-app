import LoginForm from './components/Form/loginForm';
import { AuthContextProvider } from './authContext/authContext';
import './App.css';


function App() {
  return (
    <AuthContextProvider>
      <div className="App dark">
        <LoginForm />
      </div>
    </AuthContextProvider>
  );
}

export default App;