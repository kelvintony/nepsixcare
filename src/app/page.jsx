import Image from 'next/image';
import styles from './page.module.css';
import hero_image from '@/assets/hero_image.JPG';

export default function Home() {
  return (
    <section className={styles.container}>
      <div className={styles.hero_container}>
        <div className={styles.left_container}>
          <h1>You Broke It, We Can Fix It.</h1>
          <p>
            <span className={styles.trusted_span}>Trusted</span> Repair Service
            Center For You
          </p>
        </div>
        <div className={styles.image_container}>
          <Image
            className={styles.hero_image}
            src={hero_image}
            alt='hero_image'
          />
          <div className={styles.image_overlay}></div>
          <p>
            Profesional{' '}
            <span className={styles.hero_span}>
              Grade Service and Expertise
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
