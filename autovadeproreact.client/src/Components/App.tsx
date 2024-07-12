/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import './App.css';
import NavBar from './NavBar/NavBar';
import { Outlet } from 'react-router';
//import CardList from './CardList/CardList';
// //import Search from './Search/Search';
// import UserList from './UserList/UserList';
 //import NavBar from './NavBar/NavBar';
// import CreateUserForm from './UserCreate/UserCreate';
import { UserProvider  } from './UserContext/UserContext';

//interface Forecast {
//    date: string;
//    temperatureC: number;
//    temperatureF: number;
//    summary: string;
//}


function App() {
    //const [search, setsearch] = useState<string>("");
    ////const [searchResult, setSearchResult] = useState<TicketSearch[]>([]);
    ////const [serverError, setServerError] = useState<string>("");
    //const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //    setsearch(e.target.value);
    //    console.log(e);
    //}
    //const onClick = (e: SyntheticEvent) => {
    //    console.log(e);
    //}
    // const [todos, setTodos] = useState([])
    

    useEffect(() => {
        fetch('https://localhost:7028/api/users')
            .then(response => response.json())
            .then(res => console.log(res))
    },[])

    return (
        
        // <UserProvider >
        //     <NavBar />
        //     <div className="App">
        //         <UserList />
        //     </div>
        // </UserProvider >
        <UserProvider >
                <NavBar />
                <Outlet />
        </UserProvider >
        
    );

}

export default App;