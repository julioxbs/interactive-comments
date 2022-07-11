import React from "react";
import { createComment, addReply } from "../api/api";
import juliusomo from "../../public/images/avatars/image-juliusomo.png";

export const AddComent = ({ user, commentID, userReply, replyComment, setReplyComment }: any) => {
  const [comment, setComment] = React.useState("");

  const handleChange = () => {
    if (commentID === undefined) {
      // To create own comment
      if (comment.length != 0 && user.username === 'juliusomo') {
        createComment(comment);
        setComment("");
      }
    } else {
      // To create a reply
      if (comment.length != 0) {
        addReply(commentID, comment, userReply);
        setReplyComment(!replyComment);
        setComment("");
      }
    }
  };

  return (
    <div className="addComment">
      <picture>
        <img src={juliusomo} alt="author" />
      </picture>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        name="create"
        id="create"
        rows={3}
      ></textarea>

      <button className="btn-send" onClick={() => handleChange()}>Send</button>
    </div>
  );
};
