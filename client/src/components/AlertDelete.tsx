import React from "react";
import { deleteComment, deleteReply } from "../api/api";

interface IAlertDelete {
    setOpenModalDelete: (value: boolean) => void;
    openModalDelete: boolean;
    doYouWantToDelete: {
        commentID: number | string | null;
        replyID: string | number | null;
    };
}

export const AlertDelete = ({ setOpenModalDelete, openModalDelete, doYouWantToDelete }: IAlertDelete) => {

    const {commentID, replyID } = doYouWantToDelete;

    const handleDelete = async () => {
        if (commentID !== null && replyID === null) {
            deleteComment(String(commentID));
            setOpenModalDelete(!openModalDelete);
        } else if (commentID !== null && replyID !== null) {
            deleteReply(Number(commentID), Number(replyID));
            setOpenModalDelete(!openModalDelete);
        }
    }

  return (
    <div className="dialog">
        <div className="content-delete">
            <h3>Delete comment</h3>
            <p>
                Are you sure you want to delete this comment? This will remove the comment and can't be undone.
            </p>
            <div className="buttons">
                <button onClick={() => setOpenModalDelete(!openModalDelete)} className="cancel-btn">No, Cancel</button>

                <button onClick={() => handleDelete()}
                 className="delete-btn">Yes, Delete</button>
            </div>
        </div>
    </div>
  );
};
