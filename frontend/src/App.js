import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Body from "./components/Body";
import Browse from "./components/Browse";
import IssueBook from "./components/IssueBook";
import UserBooks from "./components/UserBooks";
import RBook from "./components/RBook";
import AddBook from "./components/AddBook";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Body />
    },
    {
      path: '/browse',
      element: <Browse />
    },
    {
      path: '/viewBook',
      element: <IssueBook />
    },
    {
      path: '/account',
      element: <UserBooks />
    },
    {
      path: '/returnBook',
      element: <RBook />
    },
    {
      path: '/addBook',
      element: <AddBook />
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;