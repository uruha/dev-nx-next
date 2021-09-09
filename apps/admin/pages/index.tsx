import styles from './index.module.css';
import Link from 'next/link';

export function Index() {
  return (
    <>
      <div className={styles.page}>
        admin
      </div>
      <Link href={'/isr'}>
        <a>to ISR page</a>
      </Link>
    </>
  );
}

export default Index;
