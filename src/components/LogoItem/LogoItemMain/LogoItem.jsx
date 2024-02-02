import React from "react";
import Image from "next/image";
import styles from "./LogoItem.module.css";

const LogoItem = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Image
          src='https://nepsix.com/wp-content/uploads/2023/12/logo-Nepsix-Xmas.png'
          className={styles.logo_img}
          //  fill
          width={150}
          height={50}
        />
        <p>Care</p>
      </div>
    </div>
  );
};

export default LogoItem;
