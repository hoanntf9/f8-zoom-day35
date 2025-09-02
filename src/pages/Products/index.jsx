import { useState, useEffect } from "react";

import styles from "./Products.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "../Button";

function Products() {
  const [posts, setPosts] = useState([]);
  const [detailPost, setDetailPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=12")
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const detailProduct = (post) => {
    setDetailPost(post);
    openModal();
  };

  const truncateStr = (str, maxLength = 100) => {
    if (!str) return "";


    if (str.length < maxLength) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const subStr = str.slice(0, maxLength);
    const truncated = subStr.slice(0, subStr.lastIndexOf(" ")) + "…";

    return truncated.charAt(0).toUpperCase() + truncated.slice(1);
  };

  if (loading) {
    return (

      <div className={styles.loaderOverlay} role="status" aria-live="polite" aria-label="Đang tải">
        <div className={styles.loader}></div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Danh sách sản phẩm</h1>

        <div id="posts" className={styles.grid}>
          {
            posts.map((post) => (
              <div className={styles.card} key={post.id}>
                <h3>ID: {post.id}</h3>
                <h4>Title: {post.title}</h4>
                <p className={styles.cardBody} title={post.body}>{truncateStr(post.body)}</p>
                <Button onClick={() => detailProduct(post)}>Xem chi tiết</Button>
              </div>
            ))
          }

        </div>

        {isOpenModal && (
          <div id="modal" className={styles.modal} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 id="modal-title">Chi tiết sản phẩm</h2>
                <button className={styles.closeBtn} onClick={closeModal}>
                  <MdOutlineClose />
                </button>
              </div>

              <div id="modal-body">
                <p>ID: {detailPost.id}</p>
                <p>Title: {detailPost.title}</p>
                <p>Body: {detailPost.body}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Products;