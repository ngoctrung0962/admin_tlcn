import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import ReviewPage from "./pages/Reviews/ReviewPage";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import userApi from "./api/userApi";
import { deleteDetailUser, loginSuccess } from "./redux/userRedux";
import SignIn from "./pages/auth/signin/SignIn.page";
import SignUp from "./pages/auth/signup/SignUp.page";
import CoursesPage from "./pages/Courses/CoursesPage";
import CourseAdd from "./pages/Courses/CourseAdd/CourseAdd.page";
import CategoriesCoursesPage from "./pages/CategoriesCourse/CategoriesCoursesPage";
import CategoriesCourseAdd from "./pages/CategoriesCourse/CategoriesCourseAdd/CategoriesCourseAdd.page";
function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const getUser = async () => {
      const token = await Cookies.get("token");
      const username = await Cookies.get("username");
      try {
        if (token && username) {
          const resGetUser = await userApi.get(username);
          dispatch(loginSuccess(resGetUser.data));
          if (resGetUser.errorCode) {
            await Cookies.remove("token");
            await Cookies.remove("username");
            await dispatch(deleteDetailUser());
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <MainLayout /> : <SignIn />}>
          <Route
            path="/signin"
            element={user ? <Navigate to="/" /> : <SignIn />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUp />}
          />
          <Route index element={<Dashboard />} />
          {/* Course route start*/}
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/add" element={<CourseAdd />} />
          {/* Review route */}
          <Route path="reviews" element={<ReviewPage />} />

          {/* Categories course route */}
          <Route path="categories" element={<CategoriesCoursesPage />} />
          <Route path="categories/add" element={<CategoriesCourseAdd />} />
          <Route path="categories/edit" element={<CategoriesCourseAdd />} />


          <Route path="customers" element={<Blank />} />
          <Route path="settings" element={<Blank />} />
          <Route path="stats" element={<Blank />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
