import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderApi } from '../api/orderService';
import { resetCart } from '../features/cartSlice';
import { useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useEffect } from 'react';
import '../../public/css/CheckOut.scss';
import { useApiRequestState } from '../hooks/dataFetchReducer';

const CheckOut = () => {
  const { requestStatus, responseData, requestError, executeRequest } = useApiRequestState();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const disp = useDispatch();
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)
  const [indexError, setIndexError] = useState(-1);
  const steps = ['פרטי הזמנה', 'תשלום', 'סיום',];
  const [stage, setStage] = useState(0);

  useEffect(() => {
    errors.address_target ? setIndexError(0) : setIndexError(-1);
  }, [errors.address_target]);

  function save(data) {
    if (stage < 2) {
      setStage(stage + 1)
      return;
    }
    let products = cart.arrProducts.map(p => ({
      name: p.name,
      price: p.price,
      id_gift_in_GIFTS: p._id,
      quantity: p.quantity
    }));
    data.id_user = user.currentUser._id;
    data.products = products;
    executeRequest(() => addOrderApi(data, user.currentUser.token))
  }

  return (<div className="checkout-container">

    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={stage} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel error={indexError === index}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit(save)} >

        // Stage 0: Order Details
        {stage === 0 && <>
          <input
            className="checkout-input street-input"
            type="text"
            placeholder="רחוב - נא להכניס את שם הרחוב"
            {...register("address_target.street", {
              required: { value: true, message: "יש להכניס שם רחוב" }
            })}
          />
          {errors.address_target?.street && <p className="error street-error">{errors.address_target.street.message}</p>}
          <input
            className="checkout-input city-input"
            type="text"
            placeholder="עיר - נא להכניס את שם העיר"
            {...register("address_target.city", {
              required: { value: true, message: "יש להכניס שם עיר" }
            })}
          />
          {errors.address_target?.city && <p className="error city-error">{errors.address_target.city.message}</p>}
          <input
            className="checkout-input street-number-input"
            type="number"
            placeholder="מספר רחוב - נא להכניס את מספר הרחוב"
            {...register("address_target.street_number", {
              required: { value: true, message: "יש להכניס מספר רחוב" }
            })}
          />
          {errors.address_target?.street_number && <p className="error street-number-error">{errors.address_target.street_number.message}</p>}
          <input
            className="checkout-input house-number-input"
            type="number"
            placeholder="מספר בית - נא להכניס את מספר הבית"
            {...register("address_target.house_number", {
              required: { value: true, message: "יש להכניס מספר בית" }
            })}
          />
          {errors.address_target?.house_number && <p className="error house-number-error">{errors.address_target.house_number.message}</p>}
          <textarea
            className="checkout-input notes-input"
            placeholder="הערות להזמנה (לא חובה)"
            {...register("order_notes")}
          />
          <label className="gift-checkbox-label">
            <input
              className="checkout-input gift-checkbox"
              type="checkbox"
              {...register("wrap_as_gift")}
            />
            לארוז כמתנה
          </label>
          <label className="greeting-file-label">
            העלאת דף ברכה (PDF בלבד):
            <input
              className="checkout-input greeting-file-input"
              type="file"
              accept="application/pdf"
              {...register("greeting_file")}
            />
          </label>
        </>}

        // Stage 1: Payment Details
        {stage === 1 && <>
          <input className="checkout-input credit-card-input" type="text" {...register("credit_card_number", {
            required: { value: true, message: "credit card number is required" }
          })} />
          {errors.credit_card_number && <p className="error credit-card-error">{errors.credit_card_number.message}</p>}

          <input className="checkout-input credit-expiration-input" type="text" {...register("credit_card_expiration", {
            required: { value: true, message: "credit card expiration is required" }
          })} />
          {errors.credit_card_expiration && <p className="error credit-expiration-error">{errors.credit_card_expiration.message}</p>}

          <input className="checkout-input credit-cvv-input" type="text" {...register("credit_card_cvv", {
            required: { value: true, message: "credit card cvv is required" }
          })} />
          {errors.credit_card_cvv && <p className="error credit-cvv-error">{errors.credit_card_cvv.message}</p>}
        </>}

        // Stage 2: Summary
        {stage === 2 && <>
          <h3 className="checkout-summary total-price">סכום לתשלום: {cart.finalPrice} ש"ח</h3>
          <h3 className="checkout-summary total-items">מספר פריטים: {cart.quantityProduct}</h3>
          <h3 className="checkout-summary order-number">מספר הזמנה: {Math.floor(Math.random() * 1000000)}</h3>
        </>}
        <input className="checkout-input submit-btn" type="submit" value={stage === 2 ? "שליחה" : "הבא"} />

      </form>

    </Box>
  </div>);
}

export default CheckOut;
