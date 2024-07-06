import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// * components
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/CityList/City/City";
import Form from "./components/Form/Form";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
// * ##################################
// * pages
const Homepage = lazy(() => import("./pages/HomePage/Homepage"));
const Product = lazy(() => import("./pages/Product/Product"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const Login = lazy(() => import("./pages/Login/Login"));
// * ##################################

// import { useCities } from "./hooks/UseCities/UseCities";

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */

function App(): JSX.Element {
  // const { error } = useCities();

  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/Price" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* "replace" prop below will replace the current element in the history stack  */}
            {/* Navigate component is not Commonly used but there is some use cases we need to use it   */}
            {/* i can use it in this declarative way like below for example if i can't use the navigate that come from useNavigate hook   */}
            <Route index element={<Navigate replace to={"cities"} />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

// function Error({ error }) {
//   return (
//     <div>
//       <Message message={error["error_message"]} />
//     </div>
//   );
// }
