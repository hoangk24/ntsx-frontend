import {IComment} from "constants/models/comment.model";
import CreateComment from "pages/client/product-detail/comment/CreateComment";
import useComment from "pages/client/product-detail/comment/useComment";
import CommentItem from "pages/components/comments/CommentItem";
import React, {useEffect, useMemo} from "react";
import "./Comment.scss";
import CommentRateCount from "./CommentRateCount";

export default function Comment() {
    const {
        getCommentProduct,
        comment,
        socket,
        joinRoomProduct,
        id,
        leaveRoomProduct,
    } = useComment();

    useEffect(() => {
        joinRoomProduct();
        getCommentProduct();
        return () => leaveRoomProduct();
    }, []);

    useEffect(() => {
        socket.on("comments/success", () => {
            getCommentProduct();
        });
    }, [socket]);

    const mapComment = useMemo(() => {
        if (!comment.length) return <>Chưa có đánh giá cho sản phẩm này!</>;
        return comment.map((cm: IComment) => (
            <CommentItem
                key={Math.random()}
                comment={cm}/>
        ));
    }, [comment]);

    return (
        <div className="comment">
            <CommentRateCount/>
            <h1>Đánh giá</h1>
            {mapComment}
            <CreateComment/>
        </div>
    );
}
