import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductByIdApi } from '../api/productService';
import { CircularProgress, Box, Typography, Card, CardContent } from '@mui/material';
import '../../public/css/productDetails.scss';
import { addProduct } from '../features/cartSlice';

function ProductDetails() {
    const params = useParams();
    const productId = params.id;
    const navig = useNavigate();
    const user = useSelector(state => state.user.currentUser);
    const [product, setProduct] = useState(null);
    const [numAddToCart, setNumAddToCart] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        getProductByIdApi(productId)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.log(err);
                console.log("תקלה בשליפת המוצר");
            })
    }
        , [productId]);

    return (
        <div className='product-details'>
            <input type='button' value="x" className='close-btn' onClick={() => navig(-1)} />
            {product ? (
                <div className='inner'>
                    {product.image_url ? (
                        <img src={product.image_url} alt={product.name} />
                    ) : (
                        <div className="empty-placeholder"></div>
                    )}
                    <div className="info">
                        <h2 className='name'>{product.name}</h2>
                        <p className='description'>{product.description}</p>
                        <p className='price'>מחיר: {product.price} ₪</p>
                        <p className='category'>קטגוריה: {product.category}</p>
                        <button className='add-to-cart-btn' onClick={() => {
                            setNumAddToCart(numAddToCart + 1);
                        }}>+
                        </button>
                        <p className='num-add-to-cart'>הוספת לסל: {numAddToCart} פעמים</p>
                        <button disabled={numAddToCart <= 1} className='dec-to-cart-btn' onClick={() => {
                            setNumAddToCart(numAddToCart - 1);
                        }}>
                            -</button>
                        <button className='add-to-cart-btn' onClick={() => dispatch(addProduct(product))}>
                            הוסף לסל
                        </button>
                        {user?.role === 'admin' && (
                            <p className='quantity_in_stock'>כמות במלאי: {product.quantity_in_stock}</p>
                        )}
                    </div>
                </div>
            ) : (
                <CircularProgress sx={{ color: '#00bcd4', width: '120px !important', height: '120px !important' }} />
            )}
        </div>
    )
}

export default ProductDetails
