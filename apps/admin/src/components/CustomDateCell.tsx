import { EventContentArg } from "@fullcalendar/react";
import { isEmptyObj } from "./ExCellCalendar";

import styles from './CustomDateCell.module.css';

export const CustomEventContent = (eventInfo: EventContentArg) => {
  console.log(eventInfo);

  if (isEmptyObj(eventInfo.event.extendedProps)) {
    return;
  }

  return (
    <ul className={styles.skeleton}>
      <li className={styles.skeletonList}>
        {!isEmptyObj(eventInfo.event.extendedProps.first) && (
        <div className={`upper ${styles.cell}`}>
          <div className={styles.top}>
            <div className='situation'>
              {eventInfo.event.extendedProps.first.situation}
            </div>
            <div className={
              `${styles.level}
              ${eventInfo.event.extendedProps.first.detail.level && styles[eventInfo.event.extendedProps.first.detail.level]}
            `}>
              {eventInfo.event.extendedProps.first.detail.level}
            </div>
            <div className={styles.meal}>
              {eventInfo.event.extendedProps.first.meals.map((meal, i) => (
                <span key={i}>
                  <span >{meal.kinds}</span><span>{meal.times}</span>
                </span>
                ))
              }
            </div>
          </div>
          <div className={styles.beneath}>
            <div className='trigger'>
              {eventInfo.event.extendedProps.first.detail.trigger.map((trigger, i) => (
                <span key={i}>
                  <span>{trigger}</span>  
                </span>
                ))
              }
            </div>
            <div className='memo'>
              {eventInfo.event.extendedProps.first.detail.memo.length !== 0 && 'OK'}
            </div>
          </div>
        </div>
        )}
      </li>
      <li className={styles.skeletonList}>
        {!isEmptyObj(eventInfo.event.extendedProps.second) && (
        <div className={`upper ${styles.cell}`}>
          <div className={styles.top}>
            <div className='situation'>
              {eventInfo.event.extendedProps.second.situation}
            </div>
            <div className={
              `${styles.level}
              ${eventInfo.event.extendedProps.second.detail.level && styles[eventInfo.event.extendedProps.second.detail.level]}
            `}>
              {eventInfo.event.extendedProps.second.detail.level}
            </div>
            <div className={styles.meal}>
              {eventInfo.event.extendedProps.second.meals.map((meal, i) => (
                <span key={i}>
                  <span >{meal.kinds}</span><span>{meal.times}</span>
                </span>
                ))
              }
            </div>
          </div>
          <div className={styles.beneath}>
            <div className='trigger'>
              {eventInfo.event.extendedProps.second.detail.trigger.map((trigger, i) => (
                <span key={i}>
                  <span>{trigger}</span>  
                </span>
                ))
              }
            </div>
            <div className='memo'>
              {eventInfo.event.extendedProps.second.detail.memo.length !== 0 && 'OK'}
            </div>
          </div>
        </div>
        )}
      </li>
      <li className={styles.skeletonList}>
        {!isEmptyObj(eventInfo.event.extendedProps.third) && (
        <div className={`upper ${styles.cell}`}>
          <div className={styles.top}>
            <div className='situation'>
              {eventInfo.event.extendedProps.third.situation}
            </div>
            <div className={
              `${styles.level}
              ${eventInfo.event.extendedProps.third.detail.level && styles[eventInfo.event.extendedProps.third.detail.level]}
            `}>
              {eventInfo.event.extendedProps.third.detail.level}
            </div>
            <div className={styles.meal}>
              {eventInfo.event.extendedProps.third.meals.map((meal, i) => (
                <span key={i}>
                  <span >{meal.kinds}</span><span>{meal.times}</span>
                </span>
                ))
              }
            </div>
          </div>
          <div className={styles.beneath}>
            <div className='trigger'>
              {eventInfo.event.extendedProps.third.detail.trigger.map((trigger, i) => (
                <span key={i}>
                  <span>{trigger}</span>  
                </span>
                ))
              }
            </div>
            <div className='memo'>
              {eventInfo.event.extendedProps.third.detail.memo.length !== 0 && 'OK'}
            </div>
          </div>
        </div>
        )}
      </li>
    </ul>
  );
};