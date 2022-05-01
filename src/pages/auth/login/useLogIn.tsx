import {unwrapResult} from "@reduxjs/toolkit";
import {message} from "antd";
import {RootState, useAppDispatch} from "app/store";
import {Role} from "constants/models/auth.model";
import {LoginRequestPayload} from "constants/payload/auth.payload";
import {loginAction} from "features/auth/auth.actions";
import {setAuth} from "features/auth/auth.slice";
import {useLoading} from "hook/useLoading";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function useLogIn() {
    const dispatch = useAppDispatch();
    const loading = useLoading();
    const {user} = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const fetchLogin = async (data: LoginRequestPayload) => {
        loading?.show();
        dispatch(loginAction(data))
            .then(unwrapResult)
            .then((res: any) => loginSuccess(res))
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                loading?.hide();
            });
    };

    const loginSuccess = (res: any) => {
        dispatch(setAuth(res?.data));
        if (user?.role === Role.ADMIN) navigate("/admin");
        else navigate("/");
        message.success(res?.message);
    };
    return {fetchLogin};
}
