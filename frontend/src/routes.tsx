import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export const routes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/feed", element: <Feed /> },

];
