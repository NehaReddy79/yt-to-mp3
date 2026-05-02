import './App.css'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { Converter } from './components/Converter'

function App(){

  return(
    <>
        <Router>
          <Routes>
            <Route path="/" element = {<Converter />} />
          </Routes>
        </Router>
    </>
  );
}

export default App