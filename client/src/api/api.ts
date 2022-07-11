export const getAllComents = async () => {
  const response = await fetch("http://localhost:5000/v1/comments");
  const data = await response.json();
  return data;
};

export const createComment = async (comment: string) => {
  const response = await fetch("http://localhost:5000/v1/createComment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: comment,
    }),
  });
  const data = await response.json();
  return data;
};

export const editComment = async (commentId: number, comment: string) => {
  const response = await fetch(`http://localhost:5000/v1/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: comment,
    }),
  });
  const data = await response.json();
  return data;
}

export const deleteComment = async (commentId: string) => {
  const response = await fetch(
    `http://localhost:5000/v1/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: 'cors',
    }
  );
  const data = await response.json();
  return data;
};

export const addReply = async (commentId: number, comment: string, userReply: string) => {
  const response = await fetch(`http://localhost:5000/v1/reply/${commentId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: comment,
      replyingTo: userReply,
    }),
  });
  const data = await response.json();
  return data;
}

export const editReply = async (commentId: number, comment: string, replyID: number) => {
  const response = await fetch(`http://localhost:5000/v1/reply/${commentId}/${replyID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: comment
    }),
  });
  const data = await response.json();
  return data;
}

export const deleteReply = async (commentId: number, replyId: number) => {
  const response = await fetch(`http://localhost:5000/v1/reply/${commentId}/${replyId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}