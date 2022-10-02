import { Route, Routes } from 'react-router-dom';
// import { EmployeeList } from './components/EmployeeList';
import { GlobalProvider } from './context/GlobalState';
import { Home } from './components/Home';
import { AddEmployee } from './components/AddEmployee';
import { EditEmployee } from './components/EditEmployee';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/add" element={<AddEmployee />} exact />
          <Route path="/edit/:id" element={<EditEmployee />} exact />
        </Routes>
      </div>
    </GlobalProvider>
  );
}

export default App;