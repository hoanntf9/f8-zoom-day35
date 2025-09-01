import { useState, useEffect } from "react";

import styles from "./Comments.module.scss";


function Comments() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    name: "",
    email: "",
    body: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
      .then(response => response.json())
      .then(data => {
        const commentList = data.map(item => ({
          ...item,
          fakeTime: getRandomTime()
        }));
        setComments(commentList);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getRandomTime = () => {
    const times = ["2 giờ trước", "5 giờ trước", "1 ngày trước", "3 ngày trước", "1 tuần trước"];
    return times[Math.floor(Math.random() * times.length)];
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setComment(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      ...comment,
      fakeTime: getRandomTime()
    };

    setComments((prev) => [newComment, ...prev]);

    setComment({
      name: "",
      email: "",
      body: ""
    });
  };

  if (loading) {
    return <div>Đang tải dữ liệu....</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Bình luận</h1>

      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          placeholder="Tên của bạn"
          onChange={handleInputChange}
          value={comment.name}
        />

        <input
          type="email"
          id="email"
          placeholder="Email của bạn"
          onChange={handleInputChange}
          value={comment.email}
        />

        <textarea
          id="body"
          rows="5"
          placeholder="Nội dung bình luận"
          onChange={handleInputChange}
          value={comment.body}
        />

        <button
          type="submit"
          disabled={!comment.name || !comment.email || !comment.body}
        >
          Gửi bình luận
        </button>
      </form>

      <div className={styles.commentList}>
        {
          comments.map(comment => (
            <div className={styles.comment} key={comment.id}>
              <img src={`https://ui-avatars.com/api/?name=${comment.name}&background=random`} alt={comment.name} />

              <div className={styles.commentBody}>
                <h3>{comment.name}</h3>
                <small>{comment.email} • {comment.fakeTime}</small>
                <p>{comment.body}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Comments;