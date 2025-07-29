import { Route, Routes } from "react-router-dom";
import AllProducts from "../pages/AllProducts";
import SignUp from "../pages/SignUp";
import Login from "../pages/login";
import Cart from "../pages/Cart";
import CheckOut from "../pages/CheckOut";
import AddProduct from "../pages/addProduct";
import ProtectedRoutes from "./ProtectedRoutes";
import ProductDetails from "./ProductDetails";
import ResetPassword from "../pages/ResetPassword";

const Router = () => {
    return (
        <Routes>
            <Route path="collection/:category" element={<AllProducts />} >
                <Route path="details/:id" element={<ProductDetails />} />
            </Route>
            <Route path="collection" element={<AllProducts />} >
                <Route path="details/:id" element={<ProductDetails />} />
            </Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="/" element={<AllProducts />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<ProtectedRoutes role={"user"}><CheckOut /></ProtectedRoutes>}></Route>
            <Route path="/addProduct" element={<ProtectedRoutes role={"admin"}><AddProduct /></ProtectedRoutes>}></Route>
            <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
    );
}

export default Router;