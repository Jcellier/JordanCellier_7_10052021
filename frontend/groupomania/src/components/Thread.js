// Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  // useState
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  // dispatch
  const dispatch = useDispatch();
  // store
  const posts = useSelector((state) => state.postReducer);

  // fonction qui permet de load lorsque l'on arrive à la fin du fil d'atualité
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  // useEffect, infiny scoll
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => <Card post={post} key={post.id} />)}
      </ul>
    </div>
  );
};

// export
export default Thread;
