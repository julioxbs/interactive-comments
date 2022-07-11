import React from "react";
import { editReply, editComment } from "../api/api";
import { AddComent } from "./AddComent";
import iconMinus from "../../public/images/icon-minus.svg";
import iconPlus from "../../public/images/icon-plus.svg";
import { AlertDelete } from "./AlertDelete";

export const Comments = ({ dataComments, user }: any) => {
  const [isEditing, setIsEditing] = React.useState<{
    id: number;
    value: boolean;
  }>({
    id: 0,
    value: false,
  });

  const [replyComment, setReplyComment] = React.useState<{
    id: number;
    value: boolean;
  }>({
    id: 0,
    value: false,
  });

  const [editingComment, setEditingComment] = React.useState<string | any>();
  const [doYouWantToDelete, setDoYouWantToDelete] = React.useState<{
    commentID: number | string | null;
    replyID: number | string | null;
  }>({
    commentID: 0,
    replyID: null,
  });
  const [openModalDelete, setOpenModalDelete] = React.useState<boolean>(false);

  const handleChange = (id: number): void => {
    setIsEditing({ id: id, value: !isEditing.value });
  };

  const handleEditingReply = (commentID: number, replyID: number): void => {
    if (editingComment != "") {
      editReply(commentID, editingComment, replyID);
      isEditing.value = !isEditing.value;
      setEditingComment("");
    }
  };

  const handleEditComment = (commentID: number): void => {
    if (editingComment != "") {
      editComment(commentID, editingComment);
      isEditing.value = !isEditing.value;
      setEditingComment("");
    }
  };

  const handleDeleteComment = (Ids: any) => {
    console.log(Ids);
    setDoYouWantToDelete(Ids);
    setOpenModalDelete(!openModalDelete);
  }

  const currentUser = user?.username;

  // function that convert data
  const convertData = (data: any) => {
    const myDate = new Date(data);
    const date = myDate.toLocaleDateString();
    return date === 'Invalid Date' ? data : date
  }

  return (
    <div className="comments">
      {dataComments
        ?.sort((a: any, b: any) => b.score - a.score)
        .map((comment: any) => (
          <>
            <div className="comment" key={comment.id}>
              <div className="score">
                <button>
                  <img className="icon" src={iconMinus} alt="icon minus" />
                </button>
                {comment.score}
                <button>
                  <img className="icon" src={iconPlus} alt="icon plus" />
                </button>
              </div>
              <div className="comment-body">
                <div className="comment-top">
                  <div className="author">
                    <picture>
                      <img src={comment.user.image.png} alt="author" />
                    </picture>

                    <p>{comment.user.username}</p>

                    <span className="createdAt">{convertData(comment.createdAt)}</span>
                  </div>

                  {comment.user.username === currentUser && (
                    <div className="actions">
                      <button
                        className="del-btn"
                        onClick={() => handleDeleteComment({ commentID: comment.id, replyID: null })}
                      >
                        <i className="fa-solid fa-trash"></i>
                        <span>Delete</span>
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => handleChange(comment.id)}
                      >
                        <i className="fa-solid fa-pencil"></i>
                        <span>Edit</span>
                      </button>

                      {isEditing.value && isEditing.id === comment.id && (
                        <button
                          className="change-btn"
                          onClick={() => handleEditComment(comment.id)}
                        >
                          <i className="fa-solid fa-check"></i>
                          <span>Change</span>
                        </button>
                      )}
                    </div>
                  )}

                  {comment.user.username !== currentUser && (
                    <button
                      className="reply-btn"
                      onClick={() =>
                        setReplyComment({
                          id: comment.id,
                          value: !replyComment.value,
                        })
                      }
                    >
                      <i className="fa-solid fa-reply"></i>
                      <span>Reply</span>
                    </button>
                  )}
                </div>

                {isEditing.value && isEditing.id === comment.id ? (
                  <p
                    contentEditable={isEditing.value}
                    suppressContentEditableWarning
                    className={isEditing.value ? "editing" : ""}
                    onInput={(e) =>
                      setEditingComment(e.currentTarget.textContent)
                    }
                  >
                    {comment.content}
                  </p>
                ) : (
                  <p className="content">{comment.content}</p>
                )}

                {comment.user.username !== currentUser &&
                  replyComment.id === comment.id &&
                  replyComment.value && (
                    <AddComent
                      commentID={comment.id}
                      userReply={comment.user.username}
                      replyComment={replyComment}
                      setReplyComment={setReplyComment}
                    />
                  )}
              </div>
            </div>

            <div className="replys">
              {comment.replies.map((reply: any) => (
                <div className="comment" key={reply.id}>
                  <div className="score">
                    <button>
                      <img className="icon" src={iconMinus} alt="icon minus" />
                    </button>
                    {reply.score}
                    <button>
                      <img className="icon" src={iconPlus} alt="icon plus" />
                    </button>
                  </div>
                  <div className="comment-body">
                    <div className="comment-top">
                      <div className="author">
                        <picture>
                          <img src={reply.user.image.png} alt="author" />
                        </picture>

                        <p>{reply.user.username}</p>

                        <span className="createdAt">{convertData(reply.createdAt)}</span>
                      </div>

                      {reply.user.username === currentUser && (
                        <div className="actions">
                          <button
                            className="del-btn"
                            onClick={() => handleDeleteComment({ commentID: comment.id, replyID: reply.id })}
                          >
                            <i className="fa-solid fa-trash"></i>
                            <span>Delete</span>
                          </button>
                          <button
                            className="edit-btn"
                            onClick={() => handleChange(reply.id)}
                          >
                            <i className="fa-solid fa-pencil"></i>
                            <span>Edit</span>
                          </button>

                          {isEditing.value && isEditing.id === reply.id && (
                            <button
                              className="change-btn"
                              onClick={() =>
                                handleEditingReply(comment.id, reply.id)
                              }
                            >
                              <i className="fa-solid fa-check"></i>
                              <span>Change</span>
                            </button>
                          )}
                        </div>
                      )}

                      {reply.user.username !== currentUser && (
                        <button
                          className="reply-btn"
                          onClick={() =>
                            setReplyComment({
                              id: reply.id,
                              value: !replyComment.value,
                            })
                          }
                        >
                          <i className="fa-solid fa-reply"></i>
                          <span>Reply</span>
                        </button>
                      )}
                    </div>

                    {isEditing.value && isEditing.id === reply.id ? (
                      <p
                        contentEditable={isEditing.value}
                        suppressContentEditableWarning
                        className={isEditing.value ? "editing" : ""}
                        onInput={(e) =>
                          setEditingComment(e.currentTarget.textContent)
                        }
                      >
                        {reply.content}
                      </p>
                    ) : (
                      <p className="content">
                        <span className="replyingTo">@{reply.replyingTo}</span>{" "}
                        {reply.content}
                      </p>
                    )}

                    {reply.user.username !== currentUser &&
                      replyComment.id === reply.id &&
                      replyComment.value && (
                        <AddComent
                          commentID={comment.id}
                          userReply={reply.user.username}
                          replyComment={replyComment}
                          setReplyComment={setReplyComment}
                        />
                      )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ))}

        {openModalDelete && (<AlertDelete setOpenModalDelete={setOpenModalDelete} openModalDelete={openModalDelete} doYouWantToDelete={doYouWantToDelete} />)}
    </div>
  );
};
