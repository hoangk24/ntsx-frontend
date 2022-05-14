import { IComment } from "constants/models/comment.model";
import CreateComment from "pages/client/product-detail/comment/CreateComment";
import useComment from "pages/client/product-detail/comment/useComment";
import { useProductDetail } from "pages/client/product-detail/useProductDetail";
import CommentItem from "pages/components/comments/CommentItem";
import React, { useEffect, useMemo } from "react";
import "./Comment.scss";

export default function Comment() {
 const { comment } = useProductDetail();

 const mapComment = useMemo(() => {
  if (!comment?.length)
   return <>Chưa có đánh giá cho sản phẩm này!</>;
  return comment?.map((cm: IComment) => (
   <CommentItem key={Math.random()} comment={cm} />
  ));
 }, [comment]);

 return (
  <div className="comment">
   <h1>Đánh giá</h1>
   {mapComment}
  </div>
 );
}
