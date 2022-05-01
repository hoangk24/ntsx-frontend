import {IComment} from "constants/models/comment.model";
import {useSocket} from "hook/useSocket";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {getComment} from "services/comment.service";

export default function useComment() {
    const {id} = useParams();
    const [comment, setComment] = useState<IComment[]>([]);
    const {socket} = useSocket();

    const joinRoomProduct = () => {
        socket.emit("joinRoom", id);
    };
    const leaveRoomProduct = () => {
        socket.emit("leaveRoom", id);
    };
    const getCommentProduct = async () => {
        const res: any = await getComment(id as string);
        setComment(res?.data?.data);
    };
    const createComment = (comment: IComment) => {
        socket.emit("createComment", {room: id, comment});
    };
    const removeComment = (idComment: string) => {
        socket.emit("removeComment", {room: id, id: idComment});
    };


    return {
        id,
        leaveRoomProduct,
        getCommentProduct,
        comment,
        createComment,
        socket,
        removeComment,
        joinRoomProduct,
    };
}
