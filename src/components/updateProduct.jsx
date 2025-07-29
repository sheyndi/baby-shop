import { useForm } from "react-hook-form";
import { updateProductApi } from "../api/productService.js";
import { useSelector } from "react-redux";
import '../../public/css/updateProduct.scss';

const UpdateProduct = ({ product, changePruductEdit , setProductsArr}) => {
    const STATUS = {
        IDLE: "idle",
        LOADING: "loading",
        SUCCESS: "success",
        ERROR: "error",
    };
    const [status, setStatus] = useState(STATUS.IDLE);
    const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues: product });
    let user = useSelector(state => state.user.currentUser);

    function update(data) {
        setStatus(STATUS.LOADING);
        updateProductApi(data, user.token)
            .then(res => {
                setStatus(STATUS.SUCCESS);
                console.log(res.data);
                setProductsArr(prev => {
                    const newArr = [...prev];
                    const index = newArr.findIndex(p => p._id === data._id);
                    newArr[index] = data;
                    return newArr;
                })
                alert("המוצר עודכן בהצלחה");
                changePruductEdit(null);
            })
            .catch(err => {
                setStatus(STATUS.ERROR);
                console.log(err);
                alert(err.data);
            })
    }

    return (<div className="updateProduct">
        <form onSubmit={handleSubmit(update)}>
            <input type="text"  {...register("name", {
                required: { value: true, message: "name is required" },
                minLength: { value: 5, message: "שם חייב להכיל לפחות 5 תווים" }
            })} />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <input type="text"  {...register("description", {
                minLength: { value: 10, message: " תיאור חייב להכיל לפחות 10 תווים" }
            })} />
            {errors.description && <p className="error">{errors.description.message}</p>}

            <input type="number" min={1} step={0.1} {...register("price", {
                required: { value: true, message: "חובה להכניס מחיר" },
                min: { value: 0.5, message: "מחיר חייב להיות מספר חיובי" }
            })} />
            {errors.price && <p className="error">{errors.price.message}</p>}

            <input type="url"  {...register("image_url", {
                required: { value: true, massega: "חייבים להכניס תמונה" }
            })} />
            {errors.image_url && <p className="error">{errors.image_url.message}</p>}

            <input type="checkbox"  {...register("is_add_text")} />
            <select  {...register("category")}>
                <option value="Gift">מתנות</option>
                <option value="Baby_strollers">עגלות</option>
                <option value="Futiure">ריהוט</option>
                <option value="Clothing_and_textiles">ביגוד וטקסטיל</option>
                <option value="Toys">צעצועים</option>
                <option value="Baby_accessories">אקססוריז</option>
            </select>
            {errors.is_add_text && <p className="error">{errors.is_add_text.message}</p>}

            <input type="number" min={0}  {...register("quantity_in_stock", {
                required: { value: true, message: "חובה להכניס כמות" },
                min: { value: 0.5, message: "כמות חייב להיות מספר חיובי" }
            })} />
            {errors.quantity_in_stock && <p className="error">{errors.quantity_in_stock.message}</p>}
            <input type="submit" value="שמור" />
            <input type="button" value="ביטול" onClick={() => changePruductEdit(null)} />

        </form>
    </div>);
}

export default UpdateProduct;