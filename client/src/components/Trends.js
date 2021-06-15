// Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnePost } from "../actions/post.actions";
import { getTrends } from "../actions/trend.actions";
import CardTrend from "./Post/CardTrend";
import { isEmpty } from "./Utils";

const Trends = () => {
  // useState
  const [showTrend, setShowTrend] = useState(false);
  // store
  const posts = useSelector((state) => state.allPostsReducer);
  const postData = useSelector((state) => state.onePostReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  // dispatch
  const dispatch = useDispatch();

  // useEffect, on récupère les posts les plus liké
  useEffect(() => {
    if (!isEmpty(posts[0])) {
      // on crée un tableau
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      // on trie du plus grand au plus petit
      let sortedArray = postsArr.sort((a, b) => {
        return b.Users.length - a.Users.length;
      });
      // on garde les 3 plus liké
      sortedArray.length = 3;
      // on dispatch getTrends, on lui passe le tableau
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  // fonction qui permet de d'afficher le post
  const handleTrend = (post) => {
    let postId = post.id;
    dispatch(getOnePost(postId));
    setShowTrend(!showTrend);
  };

  return (
    <div className="trending-container">
      <h4>Top 3</h4>
      <ul>
        {!isEmpty(trendList) &&
          trendList.map((post) => {
            return (
              <li onClick={(e) => handleTrend(post)} key={post.id}>
                <div>
                  {post.imageUrl && <img src={post.imageUrl} alt="post-pic" />}
                  {isEmpty(post.imageUrl) && (
                    <img
                      src={
                        usersData[0] &&
                        usersData
                          .map((user) => {
                            if (user.id === post.UserId) {
                              return user.pictureUrl;
                            } else return null;
                          })
                          .join("")
                      }
                      alt="profil-pic"
                    />
                  )}
                </div>

                <div className="trend-content">
                  <p>{post.content}</p>
                  <span>Lire</span>
                </div>
              </li>
            );
          })}
      </ul>
      {showTrend && (
        <div className="showTrend">
          <span
            class="fas fa-plus-circle"
            onClick={() => setShowTrend(!showTrend)}></span>
          <CardTrend post={postData} />
        </div>
      )}
    </div>
  );
};

// Export
export default Trends;
