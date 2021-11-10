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
        <li>
          <Link href={'/ex-calendar'}>
            <a>to Extra Calendar page</a>
          </Link>
        </li>
        <li>
          <Link href={'/form'}>
            <a>to Selectable Suggestion form page</a>
          </Link>
        </li>
        <li>
          <Link href={'/todo-like-suggest-form'}>
            <a>to Todo like Suggestion form page</a>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Index;
