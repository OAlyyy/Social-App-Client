import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MyHeader from "../Components/MyHeader";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => like.PostId)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [history]);

  const likeAPost = (postId) => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken } }
      )
      .then((response) => {
        setListOfPosts((prevList) =>
          prevList.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                Likes: response.data.liked
                  ? [...post.Likes, 0]
                  : post.Likes.slice(0, -1),
              };
            } else {
              return post;
            }
          })
        );
        setLikedPosts((prevLikedPosts) =>
          response.data.liked
            ? [...prevLikedPosts, postId]
            : prevLikedPosts.filter((id) => id !== postId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <MyHeader />
      <div>
        {listOfPosts.map((value, key) => {
          return (
            <div className="post" key={key}>
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              >
                {" "}
                {value.postText}
              </div>
              <div className="footer">
                <div className="username"> <Link to ={`/profile/${value.UserId}`}>{value.username} </Link></div>
                <div className="buttons">
                  <FavoriteIcon
                    onClick={() => {
                      likeAPost(value.id);
                    }}
                    className={
                      likedPosts.includes(value.id) ? "likeBttn" : "unlikeBttn"
                    }
                  />
                  <label> {value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
