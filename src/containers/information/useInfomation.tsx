import { unwrapResult } from "@reduxjs/toolkit";
import { message, Modal } from "antd";
import { UploadChangeParam } from "antd/es/upload/interface";
import { UploadFile } from "antd/lib/upload/interface";
import { useAppDispatch } from "app/store";
import { IUser } from "constants/models/auth.model";
import { UpdatePasswordPayload } from "constants/payload/user.payload";
import {
 setAuth,
 setLogOut,
 setUser,
} from "features/auth/auth.slice";
import {
 updateInformationAction,
 updatePasswordAction,
} from "features/users/users.action";
import { useLoading } from "hook/useLoading";
import { useNavigate } from "react-router-dom";

export default function useInfomation() {
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const navigate = useNavigate();
 const updatePassword = (update: UpdatePasswordPayload) => {
  return dispatch(updatePasswordAction(update))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res?.message);
    Modal.confirm({
     title: "Đổi mật khẩu thành công bạn có muốn đăng nhập lại không",
     okText: "Đăng nhập lại",
     cancelText: "Giữ tôi đăng nhập",
     onOk: () => {
      dispatch(setLogOut());
      navigate("/login");
     },
    });
   })
   .catch((err: any) => message.error(err.message))
   .finally(() => loading?.hide());
 };
 const update = (
  data?: Partial<IUser>,
  file?: UploadFile<unknown>
 ) => {
  // loading?.show();
  let formData = new FormData();
  if (data) {
   for (const [key, value] of Object.entries(data)) {
    formData.append(key, value as any);
   }
  }
  if (file) {
   formData.append("avatar", file as any);
  }
  dispatch(
   updateInformationAction({
    data: formData,
   })
  )
   .then(unwrapResult)
   .then((res: any) => {
    dispatch(setUser(res?.data));
    message.success(res?.message);
   })
   .catch((err: any) => message.error(err.message))
   .finally(() => loading?.hide());
 };
 return { update, updatePassword };
}
