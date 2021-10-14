import styles from './index.module.css';
import Link from 'next/link';

export function Index() {
  return (
    <>
      <div className={styles.page}>
        admin
      </div>
      <ul>
        <li>
          <Link href={'/isr'}>
            <a>to ISR page</a>
          </Link>
        </li>
        <li>
          <Link href={'/chart'}>
            <a>to Chart page</a>
          </Link>
        </li>
        <li>
          <Link href={'/calendar'}>
            <a>to Calendar page</a>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Index;
