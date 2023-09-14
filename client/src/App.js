import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import LoginPage, { action as loginAction } from "./pages/Login";
import SignupPage, { action as singupAction } from "./pages/Signup";
import ProfilePage, { loadProfile, loadUserProfile } from "./pages/Profile";
// import ProfileLayout from "./pages/ProfileLayout";
import UpdateProfile, { updateAction } from "./pages/UpdateProfile";
import BlogPage, { loadBlogData } from "./pages/Blog";
import NewBlog, { postBlog } from "./pages/NewBlog";
import EditBlog, { editBlog } from "./pages/EditBlog";
import AddSkillsPage, { saveSkillsAction } from "./pages/AddSkills";

const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout exact />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/user/:userId',
        element: <ProfilePage />,
        loader: loadUserProfile
      },
      {
        path: '/profile',
        // id: 'profile-data',
        // element: <ProfileLayout />,
        // loader: loadProfile,
        children: [
          {
            path: '/profile',
            element: <ProfilePage />,
            loader: loadProfile
          },
          {
            path: '/profile/update',
            element: <UpdateProfile />,
            loader: loadProfile,
            action: updateAction
          },
          {
            path: '/profile/addskills',
            element: <AddSkillsPage />,
            loader: loadProfile,
            action: saveSkillsAction
          }
        ]
      },
      {
        path: '/blogs',
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            path: '/blogs/:BlogId',
            loader: loadBlogData,
            element: <BlogPage />
          },
          {
            path: '/blogs/:BlogId/edit',
            action: editBlog,
            loader: loadBlogData,
            element: <EditBlog />
          },
          {
            path: '/blogs/new',
            element: <NewBlog />,
            action: postBlog
          }
        ]
      },
      {
        path: '/login',
        element: <LoginPage />,
        action: loginAction
      },
      {
        path: '/signup',
        element: <SignupPage />,
        action: singupAction
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
