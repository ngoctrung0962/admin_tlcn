import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import ReviewPage from "./pages/Reviews/ReviewPage";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import userApi from "./api/userApi";
import { deleteDetailUser, loginSuccess } from "./redux/userRedux";
import SignIn from "./pages/auth/signin/SignIn.page";
import SignUp from "./pages/auth/signup/SignUp.page";
import CoursesPage from "./pages/Courses/CoursesPage";
import CourseAdd from "./pages/Courses/CourseAdd/CourseAdd.page";
import CategoriesCoursesPage from "./pages/CategoriesCourse/CategoriesCoursesPage";
import CategoriesCourseAdd from "./pages/CategoriesCourse/CategoriesCourseAdd/CategoriesCourseAdd.page";
import ReviewAdd from "./pages/Reviews/ReviewAdd/ReviewAdd.page";
import CouponPage from "./pages/Coupons/CouponsPage";
import CouponAdd from "./pages/Coupons/CouponAdd/CouponAdd.page";
import PaymentMethodPage from "./pages/PaymentMethod/PaymentMethodPage";
import PaymentMethodAdd from "./pages/PaymentMethod/PaymentMethodAdd/PaymentMethodAdd.page";
import Loading from "./components/Loading/Loading.component";
import ForgotPass from "./pages/auth/ForgotPass/ForgotPass.page";
import RequestTeacherPage from "./pages/RequestTeacher/RequestTeacherPage";
import OrderPage from "./pages/Orders/OrderPage";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    };

    getUser();
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />

        <Route
          path="/forgotpass"
          element={user ? <Navigate to="/" /> : <ForgotPass />}
        />
        <Route path="/" element={user ? <MainLayout /> : <SignIn />}>
          <Route index element={<Dashboard />} />
          {/* Course route start*/}
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:id" element={<CourseAdd isEdit={true} />} />
          <Route path="courses/add" element={<CourseAdd />} />

          {/* Review route */}
          <Route path="reviews" element={<Outlet />}>
            <Route path="" element={<ReviewPage />} />
            <Route path="add" element={<ReviewAdd />} />
            <Route path=":id" element={<ReviewAdd isEdit={true} />} />
          </Route>

          {/* Categories course route */}
          <Route path="categories" element={<CategoriesCoursesPage />} />
          <Route path="categories/add" element={<CategoriesCourseAdd />} />
          <Route path="categories/:id" element={<CategoriesCourseAdd />} />

          {/* Coupons  route */}
          <Route path="coupons" element={<CouponPage />} />
          <Route path="coupons/add" element={<CouponAdd />} />
          <Route path="coupons/:id" element={<CouponAdd />} />

          {/* payments  route */}
          <Route path="payments" element={<PaymentMethodPage />} />
          <Route path="payments/add" element={<PaymentMethodAdd />} />
          <Route path="payments/:id" element={<PaymentMethodAdd />} />

          {/* Order route */}
          <Route path="orders" element={<Outlet />}>
            <Route path="" element={<OrderPage />} />
            <Route path=":id" element={<ReviewAdd isEdit={true} />} />
          </Route>

          <Route path="customers" element={<Blank />} />
          <Route path="requestteacher" element={<RequestTeacherPage />} />

          <Route path="settings" element={<Blank />} />
          <Route path="stats" element={<Blank />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
