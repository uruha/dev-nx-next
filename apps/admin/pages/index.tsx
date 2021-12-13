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
            <a>to Chart page by Chart.js</a>
          </Link>
        </li>
        <li>
          <Link href={'/apex-charts'}>
            <a>to ApexCharts page</a>
          </Link>
        </li>
        <li>
          <Link href={'/monthly-charts'}>
            <a>to Monthly Charts by ApexCharts</a>
          </Link>
        </li>
        <li>
          <Link href={'/any-range-charts'}>
            <a>to Any Monthly Charts by ApexCharts</a>
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
        <li>
          <Link href={'/todo-like-suggest-form-2nd'}>
            <a>to Todo like Suggestion form page pattern 2</a>
          </Link>
        </li>
        <li>
          <Link href={'/tag-list-like-suggest-form'}>
            <a>to Tag List like Suggestion form page</a>
          </Link>
        </li>
        <li>
          <Link href={'/tag-list-like-suggest-form-2nd'}>
            <a>to Tag List like Suggestion form page pattern 2</a>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Index;
