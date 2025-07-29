import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginApi } from "../api/userService";
import { userIn } from "../features/userSlice";
import { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import FilledInput from '@mui/material/FilledInput';
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import '../../public/css/login.scss';

const Login = () => {
    const STATUS = {
        IDLE: "idle",
        LOADING: "loading",
        SUCCESS: "success",
        ERROR: "error",
    };
    let navigate = useNavigate();
    const disp = useDispatch();
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState(STATUS.IDLE);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { email: "", password: "" }
    });

    function login(data) {
        setStatus(STATUS.LOADING);
        setServerError("");
        loginApi(data)
            .then(res => {
                setStatus(STATUS.SUCCESS);
                console.log(res.data)
                disp(userIn(res.data));
                alert("שלום ל: " + res.data.userName);
                navigate(-1);
            })
            .catch(err => {
                console.log(err);
                setStatus(STATUS.ERROR);
                setServerError(err.response.data.message);
            });
    }

    return (
        <div className="auth-container">
            <form noValidate onSubmit={handleSubmit(login)} >
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
                            <FilledInput
                                {...field}
                                id="filled-email"
                                type="email"
                            />
                            {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "נא להזין סיסמה",
                        minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" }
                    }}
                    render={({ field }) => (
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.password}>
                            <InputLabel htmlFor="filled-adornment-password">סיסמה</InputLabel>
                            <FilledInput
                                {...field}
                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                        </FormControl>
                    )}
                />
                <div style={{ textAlign: 'left', width: '25ch', margin: '0 auto 8px' }}>
                    <a href="/reset-password" style={{ fontSize: '0.95em', color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}>שכחתי סיסמה</a>
                </div>

                {status === STATUS.ERROR && <p className="error">{serverError}</p>}

                <Button disabled={status === STATUS.LOADING && true} type="submit" variant="outlined" sx={{ m: 1, width: '25ch' }} size="large">
                    {status === STATUS.LOADING ? <CircularProgress size={35} /> : "התחברות"}
                </Button>

            </form>
        </div>
    );
}

export default Login;
