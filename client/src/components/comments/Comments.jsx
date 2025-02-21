import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const Comments = ({ post_id }) => {
  const [comment_desc, setcomment_desc] = useState("");
  const { currentUser } = useContext(AuthContext);

  /*  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get(`/comments?post_id=${post_id}`).then((res) => {
      return res?.data;
    })
  ); */

  const {
    isLoading,
    error,
    data = [],
  } = useQuery(["comments"], () =>
    makeRequest.get(`/comments?post_id=${post_id}`).then((res) => {
      console.log("Response from API:", res.data); // Verifica la respuesta

      // Si `res.data` es un array, úsalo; si es un objeto, conviértelo en array
      return Array.isArray(res?.data) ? res.data : [res.data];
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ comment_desc, post_id });
    setcomment_desc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.user_profile_img} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={comment_desc}
          onChange={(e) => setcomment_desc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {/* 
      {Array.isArray(announcementData) &&
        announcementData.map((item) => (
          <AnnouncementCard
            key={item?.announcement_id}
            {...item}
            onDelete={handleDelete}
          />
        ))} */}
      {isLoading
        ? "loading"
        : error
        ? "Error loading comments"
        : Array.isArray(data) && data.length > 0
        ? data.map((comment) => (
            <div className="comment" key={comment.comment_id}>
              <img src={"/upload/" + comment.user_profile_img} alt="" />
              <div className="info">
                <span>{comment.user_name}</span>
                <p>{comment.comment_desc}</p>
              </div>
              <span className="date">
                {moment(comment.comment_creation_time).fromNow()}
              </span>
            </div>
          ))
        : "No comments available"}
    </div>
  );
};

export default Comments;
