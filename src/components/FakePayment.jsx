import { useForm } from "react-hook-form";
import { useState } from "react";
import "../../public/css/fakePayment.scss";
import { Lock } from "lucide-react";

export default function FakePayment() {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    setLoading(true);
    console.log("simulate payment:", data);

    // נמתין כמה שניות כדי לדמות תשלום
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 2000);
  };

  if (paid) {
    return (
      <div className="payment-container">
        <div className="thanks-box">
          <h2>🎉 תודה על הרכישה!</h2>
          <p>התשלום התקבל בהצלחה. מייל אישור נשלח אליך.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="summary">
        <h2>סיכום הזמנה</h2>
        <p>סה״כ לתשלום: <strong>₪249.90</strong></p>
      </div>

      <form className="fake-payment-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="secure-header">
          <Lock size={20} />
          <span>תשלום מאובטח</span>
        </div>

        <input
          type="text"
          placeholder="מספר כרטיס אשראי"
          {...register("cardNumber", {
            required: "חובה להזין מספר כרטיס",
            minLength: { value: 12, message: "מינימום 12 ספרות" }
          })}
        />
        {errors.cardNumber && <p>{errors.cardNumber.message}</p>}

        <input
          type="text"
          placeholder="MM/YY"
          {...register("expiry", { required: "חובה להזין תוקף" })}
        />
        {errors.expiry && <p>{errors.expiry.message}</p>}

        <input
          type="text"
          placeholder="CVV"
          {...register("cvv", {
            required: "חובה להזין CVV",
            minLength: { value: 3, message: "לפחות 3 ספרות" }
          })}
        />
        {errors.cvv && <p>{errors.cvv.message}</p>}

        <input
          type="text"
          placeholder="שם בעל הכרטיס"
          {...register("cardName", { required: "חובה להזין שם" })}
        />
        {errors.cardName && <p>{errors.cardName.message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "טוען..." : "שלם עכשיו"}
        </button>

        {loading && <div className="loader"></div>}
      </form>
    </div>
  );
}
