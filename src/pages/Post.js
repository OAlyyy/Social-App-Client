import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import MyHeader from "../Components/MyHeader";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    axios.get(`https://social-app-oalyyy.herokuapp.com/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`https://social-app-oalyyy.herokuapp.com/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "https://social-app-oalyyy.herokuapp.com/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    console.log("tryinhg 1st ");
    axios
      .delete(`https://social-app-oalyyy.herokuapp.com/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        console.log("tryinhg 2nd ");
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`https://social-app-oalyyy.herokuapp.com/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        console.log("tryinhg 4th ");
        history.push("/");
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter New Title: ");
      axios.put("https://social-app-oalyyy.herokuapp.com/posts/title", {
        newTitle: newTitle,
        id: id,
      },{
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
      );
      setPostObject({...postObject,title: newTitle})
    }  
    else {
      let newPostText = prompt("Enter New Text: ");
      axios.put("https://social-app-oalyyy.herokuapp.com/posts/postText", {
        newText: newPostText,
        id: id,
      },{
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
      );
      setPostObject({...postObject,postText: newPostText})
    }
  };

  return (
    <>
      <MyHeader />
      <div className="postPage">
        <div className="leftSide">
          <div className="post" id="individual">
            <div
              className="title"
              onClick={() => {
                if (authState.username === postObject.username) {
                  editPost("title");
                }
              }}
            >
              {postObject.title}
            </div>
            <div
              className="body"
              onClick={() => {
                if (authState.username === postObject.username) {
                  editPost("body");
                }
              }}
            >
              {postObject.postText}
            </div>
            <div className="footer">
              {postObject.username}
              {authState.username === postObject.username && (
                <button
                  onClick={() => {
                    deletePost(postObject.id);
                  }}
                >
                  {" "}
                  Delete Post
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="addCommentContainer">
            <input
              type="text"
              placeholder="Comment..."
              autoComplete="off"
              value={newComment}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
            <button onClick={addComment}> Add Comment</button>
          </div>
          <div className="listOfComments">
            {comments.map((comment, key) => {
              return (
                <div key={key} className="comment">
                  {comment.commentBody}
                  <label> Username: {comment.username}</label>
                  {authState.username === comment.username && (
                    <button
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    >
                      X
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
