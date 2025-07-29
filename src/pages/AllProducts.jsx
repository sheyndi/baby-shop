import { useState } from "react";
import { useEffect } from "react";
import { getAllProductsApi, pagesProductsApi } from "../api/productService";
import Product from "../components/productInList";
import UpdateProduct from "../components/updateProduct";
import MiniCart from "../components/MiniCart";
import Pagination from '@mui/material/Pagination';
import { useRef } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import '../../public/css/allProduct.scss';

const AllProducts = () => {
    const STATUS = {
        IDLE: "idle",
        LOADING: "loading",
        SUCCESS: "success",
        ERROR: "error",
    };
    const [productsArr, setProductsArr] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [productToEdit, setProductToEdit] = useState(null);
    const [isShowCart, setIsShowCart] = useState(false);
    const categories = ["Baby_accessories", "Clothing_and_textiles", "Baby_strollers", "Futiure", "Gift", "Toys"];
    const [status, setStatus] = useState(STATUS.LOADING);
    const limit = 16;
    const { category } = useParams();

    useEffect(() => {
        setStatus(STATUS.LOADING);
        setProductsArr([]);
        getAllProductsApi(limit, currentPage, category)
            .then(res => {
                setStatus(STATUS.SUCCESS);
                setProductsArr(res.data)
                console.log(res.data)
            })
            .catch(err => {
                setStatus(STATUS.ERROR);
                setProductsArr([]);
                console.log(err);
                console.log("תקלה בשליפת כל המוצרים")
            })
    }, [currentPage, category])

    useEffect(() => {
        pagesProductsApi(limit, category)
            .then(res => {
                setNumPages(res.data.totalPages)
                console.log(res);
            })
    }, [category]);

    useEffect(() => {
        if (category) {
            setCurrentPage(1);
        }
    }, [category]);

    const cartTimeoutRef = useRef(null);
    function showCart() {
        if (cartTimeoutRef.current)
            clearTimeout(cartTimeoutRef.current);
        setIsShowCart(true);
        cartTimeoutRef.current = setTimeout(() => {
            setIsShowCart(false);
        }, 8000);
    }

    function handleProductEdit(p) {
        setProductToEdit(p);
    }

    function handleIsShowCart() {
        setIsShowCart(false);
    }

    function deleteProduct(p) {
        setProductsArr(prev => {
            const newArr = [...prev];
            const index = newArr.findIndex(prod => prod._id === p._id);
            if (index !== -1) {
                newArr.splice(index, 1);
            }
            return newArr;
        });
    }

    return (
        <div className="allProduct">
            <Outlet />
            <div className="categoryLinks">
                {categories.map(cat => (
                    <NavLink
                        className={({ isActive }) => isActive ? "activeLinkCat" : "linkCat"}
                        key={cat}
                        to={`/collection/${cat}`}
                    >
                        {cat}
                    </NavLink>
                ))}
            </div>
            <ul className="productsContainer">
                {status === STATUS.LOADING && <p>טוען מוצרים...</p>}
                {productsArr.length === 0 && status === STATUS.SUCCESS && <p className="products-empty">אין מוצרים בקטגוריה זו</p>}
                {status === STATUS.ERROR && <p className="products-error">אירעה שגיאה בעת טעינת המוצרים. נסו לרענן את הדף.</p>}
                {productsArr.map(p => <li key={p.id}><Product product={p} updateProduct={handleProductEdit} showCart={showCart} deleteProduct={deleteProduct} /></li>)}
            </ul>
            {(numPages > 1 && productsArr.length > 0) &&
                <Pagination count={numPages} shape="rounded" page={currentPage} onChange={(event, value) => setCurrentPage(value)} />}

            {isShowCart && <MiniCart handleIsShowCart={handleIsShowCart}></MiniCart>}
            {productToEdit && <UpdateProduct product={productToEdit} changePruductEdit={handleProductEdit} setProductsArr={setProductsArr} />}
        </div>
    );
}

export default AllProducts;