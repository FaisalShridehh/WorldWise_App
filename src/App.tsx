import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import CityList from "./components/CityList/CityList";

import CountryList from "./components/CountryList/CountryList";
import City from "./components/CityList/City/City";
import Form from "./components/Form/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/Price" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
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
    </BrowserRouter>
  );
}

export default App;
