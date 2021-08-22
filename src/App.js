import LoginForm from './components/Form/loginForm';
import ChatForum from './components/chatForum/chatForum'
import { AuthContextProvider } from './authContext/authContext';
import './App.css';


function App() {
  return (
    <AuthContextProvider>
      <div className="App dark">
        <LoginForm />
        <ChatForum/>
      </div>
    </AuthContextProvider>
  );
}

export default App;