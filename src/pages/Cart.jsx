import { useDispatch, useSelector } from "react-redux";
import ProductInCart from "../components/productInCart";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../features/cartSlice";
import "../../public/css/cart.scss";

const Cart = () => {
    let user = useSelector(state => state.user.currentUser)
    let disp = useDispatch();
    let navigate = useNavigate();
    let cart = useSelector(state => state.cart);

    function finishOrder() {
        if (!user)
            navigate("/login")
        else
            navigate("/checkout")
    }

    return (<div className="cart">
        <h1>{cart.finalPrice}</h1>
        <h2>{cart.quantity}</h2>
        <div>
            {cart.arrProducts.map(p => <ProductInCart product={p} key={p._id}></ProductInCart>)}
        </div>
        {cart.arrProducts.length !== 0 && <>
        <input type="button" value={"רוקן עגלה"} onClick={()=>disp(resetCart())}/>
        <input type="button" value={"סיום הזמנה"} onClick={() => finishOrder()} />
        </>}
    </div>);
}

export default Cart;