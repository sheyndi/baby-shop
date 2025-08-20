import { useForm, Controller } from "react-hook-form";
import { addUserApi } from "../api/userService";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";
import { useState } from "react";
import { useApiRequestState } from "../hooks/dataFetchReducer";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import FilledInput from "@mui/material/FilledInput";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = () => {
    const { requestStatus, responseData, requestError, executeRequest } = useApiRequestState();
    const [showPassword, setShowPassword] = useState(false);
    const disp = useDispatch();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { userName: "", email: "", password: "", phone: "" }
    });

    function save(data) {
        executeRequest(addUserApi(data), () => {
            disp(userIn(res.data))
            reset();
        })
    }
    return (
        <div className="auth-container">
            <form noValidate onSubmit={handleSubmit(save)}>

                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "נא להזין אימייל",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "כתובת אימייל לא תקינה" }
                    }}
                    render={({ field }) => (
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.email}>
                            <InputLabel htmlFor="filled-email">אימייל</InputLabel>
                            <FilledInput {...field} id="filled-email" type="email" />
                            {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                <Controller
                    name="userName"
                    control={control}
                    rules={{ required: "נא להזין שם משתמש" }}
                    render={({ field }) => (
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.userName}>
                            <InputLabel htmlFor="filled-userName">שם משתמש</InputLabel>
                            <FilledInput {...field} id="filled-userName" />
                            {errors.userName && <FormHelperText>{errors.userName.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "נא להזין סיסמה",
                        pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "סיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד" }
                    }}
                    render={({ field }) => (
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.password}>
                            <InputLabel htmlFor="filled-password">סיסמה</InputLabel>
                            <FilledInput
                                {...field}
                                id="filled-password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                <Controller
                    name="phone"
                    control={control}
                    rules={{
                        required: "נא להזין מספר טלפון",
                        pattern: { value: /^(\+972|0)([2-9]{1}[0-9]{7}|5[0-9]{8})$/, message: "מספר טלפון לא תקין" }
                    }}
                    render={({ field }) => (
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.phone}>
                            <InputLabel htmlFor="filled-phone">טלפון</InputLabel>
                            <FilledInput {...field} id="filled-phone" type="tel" />
                            {errors.phone && <FormHelperText>{errors.phone.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                {requestStatus = 'error_user' && <p className="error">{serverError}</p>}

                <Button disabled={requestStatus == 'loading' && true} type="submit" variant="outlined" sx={{ m: 1, width: '25ch' }} size="large">
                    {requestStatus == 'loading' ? <CircularProgress size={35} /> : "הרשמה"}
                </Button>
            </form>
        </div>
    );
}

export default SignUp;