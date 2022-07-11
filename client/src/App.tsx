import React from "react";
import { AddComent } from "./components/AddComent";
import { Comments } from "./components/Comments";
import { getAllComents } from "./api/api";


export type IComment = {
  message: string;
  totalComments: number;
  dataFile: {
    comments: {
      content: string;
      createdAt: string;
      id: number;
      replies: [],
      user: {
        image: {
          png: string;
          webp: string;
        }
        username: string;
      }
    }[],
    currentUser: {
      image: {
        png: string;
        webp: string;
      },
      username: string;
    }
  }
}

export const App = () => {
  const [myComments, setComments] = React.useState<IComment>();
  const dataComents = myComments?.dataFile?.comments;
  const currentUser = myComments?.dataFile?.currentUser;

  React.useEffect(() => {
    getAllComents().then(data => setComments(data));
  }, [myComments]);

  return (
    <main>
      <Comments dataComments={dataComents} user={currentUser} />
      <AddComent user={currentUser} />
    </main>
  );
};
