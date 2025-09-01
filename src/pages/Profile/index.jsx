
import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";

import avatarUrl from "/avatar.png";

import Buttons from "../Buttons";
function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false); // dữ liệu tải xong tắt loading
      })
      .catch(() => {
        setLoading(false); // nếu lỗi cũng tắt loading
      });
  }, []);

  if (loading) {
    return <div>Đang tải…</div>;
  }

  return (
    <div className={styles.slideContainer}>
      <div className={styles.slideContent}>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.imageContent}>
              <span className={styles.overlay}></span>
              <div className={styles.cardImage}>
                <img src={avatarUrl} alt="avatar" className={styles.cardImg} />
              </div>
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.name}>{user.name}</h2>
              <p className={styles.cardItem}><strong>Username:</strong> {user.username}</p>
              <p className={styles.cardItem}><strong>Email:</strong> {user.email}</p>
              <p className={styles.cardItem}><strong>Phone:</strong> {user.phone}</p>
              <p className={styles.cardItem}><strong>Website:</strong> {user.website}</p>
              <p className={styles.cardItem}><strong>Address:</strong> {user?.address?.street} - {user?.address?.city}</p>

              <Buttons bordered className={styles.btnViewMore}>View More</Buttons>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;