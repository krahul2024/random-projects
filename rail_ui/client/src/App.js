import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


//importing routes and components
import SearchResults from './components/search_results';
import Home from './components/home'


const router = createBrowserRouter([{
        path: '/',
        element: <Home></Home>
    },
    {
        path: '/search',
        element: <SearchResults></SearchResults>
    }
])


const App = () => {
    return (

        <main className="">
		<RouterProvider router={router} />
		</main>

    )
}


export default App;