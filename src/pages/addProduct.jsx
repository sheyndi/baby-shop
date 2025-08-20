import { useForm } from "react-hook-form";
import { addProductApi } from "../api/productService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../../public/css/addProduct.scss';
import { useApiRequestState } from "../hooks/dataFetchReducer";

const AddProduct = () => {
    const { requestStatus, responseData, requestError, executeRequest } = useApiRequestState();
    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm({ mode: "all" });

    function save(data) {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("is_add_text", data.is_add_text);
        formData.append("category", data.category);
        formData.append("quantity_in_stock", data.quantity_in_stock);
        formData.append("image", data.image[0]);
        executeRequest(() => addProductApi(formData, user.token), navigate("/collection"));
    }

    return (
        <div className="addProduct">
            <form onSubmit={handleSubmit(save)} encType="multipart/form-data">
                <input type="text"  {...register("name", {
                    required: { value: true, message: "name is required" },
                    minLength: { value: 5, message: "שם חייב להכיל לפחות 5 תווים" }
                })} />
                {errors.name && <p className="error">{errors.name.message}</p>}

                <input type="text"  {...register("description", {
                    minLength: { value: 5, message: " תיאור חייב להכיל לפחות 10 תווים" }
                })} />
                {errors.description && <p className="error">{errors.description.message}</p>}

                <input type="number" min={1} step={0.1} {...register("price", {
                    required: { value: true, message: "חובה להכניס מחיר" },
                    min: { value: 0.5, message: "מחיר חייב להיות מספר חיובי" }
                })} />
                {errors.price && <p className="error">{errors.price.message}</p>}

                <input type="file"  {...register("image", {
                    required: { value: true, massega: "חייבים להכניס תמונה" }
                })} />
                {errors.image && <p className="error">{errors.image.message}</p>}

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

            </form>
        </div>
    );
}

export default AddProduct;