import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';


const code = new URLSearchParams(window.location.search).get('code');

function App() {

  return  code? <Dashboard code={code}/> : <Login className="d-flex flex-column justify-content-center"/>
}
  

export default App
