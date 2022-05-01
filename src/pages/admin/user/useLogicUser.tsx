import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import { IUser } from "constants/models/auth.model";
import { CreateEmailPayload } from "constants/payload/auth.payload";
import {
 ActiveMailPayload,
 ChangeRolePayload,
 CreateUserRequest,
} from "constants/payload/user.payload";
import {
 activeMailAction,
 changeRoleAction,
 createMailAction,
 createUserAction,
 deleteUserAction,
 getAllUserAction,
 getUserInfoAction,
 resendMailAction,
} from "features/users/users.action";
import { useLoading } from "hook/useLoading";
import React, { useState } from "react";

export default function useLogicUser() {
 const [data, setData] = useState([]);
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const [currentUser, setCurrentUser] = useState<IUser>();

 const fetchAllUser = () => {
  loading?.show();
  dispatch(getAllUserAction())
   .then(unwrapResult)
   .then((res: any) => setData(res.data))
   .finally(() => loading?.hide());
 };

 const fetchUser = (id: string) => {
  loading?.show();
  dispatch(getUserInfoAction(id))
   .then(unwrapResult)
   .then((res: any) => {
    setCurrentUser(res?.data);
   })
   .catch((err) => message.error(err.message))
   .finally(() => {
    loading?.hide();
   });
 };

 const deleteUser = (id: string) => {
  loading?.show();
  dispatch(deleteUserAction(id))
   .then(unwrapResult)
   .then((res: any) => fetchAllUser())
   .catch((err) => message.error(err.message))
   .finally(() => {
    loading?.hide();
   });
 };

 const addUser = (value: CreateUserRequest) => {
  loading?.show();
  dispatch(createUserAction(value))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res?.message);
    fetchAllUser();
   })
   .catch((err) => message.error(err.message))
   .finally(() => {
    loading?.hide();
   });
 };

 const resendMail = (id: string) => {
  loading?.show();
  dispatch(resendMailAction({ id }))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
   })
   .catch((err: any) => message.error(err?.message))
   .finally(() => loading?.hide());
 };

 const createMail = (
  data: CreateEmailPayload,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  resetFields: any
 ) => {
  setLoading(true);
  dispatch(createMailAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    resetFields();
   })
   .catch((err: any) => message.error(err?.message))
   .finally(() => setLoading(false));
 };

 const changeRole = (data: ChangeRolePayload, fn: any) => {
  dispatch(changeRoleAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    fn();
   })
   .catch((err) => message.error(err.message))
   .finally(() => {});
 };

 const activeMail = async (data: ActiveMailPayload, fn: any) => {
  dispatch(activeMailAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    fetchUser(data.id);
    fn();
   })
   .catch((err) => message.error(err.message))
   .finally(() => {});
 };

 return {
  setData,
  data,
  addUser,
  deleteUser,
  currentUser,
  fetchAllUser,
  resendMail,
  createMail,
  activeMail,
  fetchUser,
  changeRole,
 };
}
