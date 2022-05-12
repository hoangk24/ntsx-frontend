import { Avatar, Comment, Rate, Space } from "antd";
import { useAppSelector } from "app/store";
import { Role } from "constants/models/auth.model";
import { IComment } from "constants/models/comment.model";
import useComment from "pages/client/product-detail/comment/useComment";
import React from "react";

type Props = {
 comment: IComment;
};
export default function CommentItem({ comment }: Props) {
 const { user } = useAppSelector().auth;
 const { removeComment } = useComment();
 return (
  <Comment
   author={
    <Space size={50}>
     <Space>
      <span>{comment?.user?.fullName}</span>
     </Space>
     {(user?.role === Role.ADMIN ||
      user?._id === comment?.user?._id) && (
      <span
       onClick={() => {
        removeComment(comment._id as string);
       }}
       className="action">
       Xoá
      </span>
     )}
    </Space>
   }
   avatar={
    <Avatar
     src={
      comment?.user?.avatar || "https://joeschmoe.io/api/v1/random"
     }
     alt="Han Solo"
    />
   }
   content={<Rate disabled value={comment?.rate} />}
  />
 );
}
