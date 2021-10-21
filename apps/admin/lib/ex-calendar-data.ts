export const dailyEventsData = [
  {
    start: '2021-10-06',
    extendedProps: {
      first: {
        event: true,
        situation: 'love',
        detail: {
          level: 'middle',
          kinds: ['hoge', 'fuga'],
          trigger: ['dog', 'cat'],
          memo: 'csktjfhgnsktghnskntghsktgjshnkgshcgkshngksjgnhsiguiskjctbg'
        },
        meals: [
          {
            kinds: 'rice',
            times: 2,
            effect: true
          }
        ]
      },
      second: {},
      third: {
        event: true,
        situation: 'home',
        detail: {
          level: 'low',
          kinds: ['bar'],
          trigger: ['dog', 'cat'],
          memo: ''
        },
        meals: [
          {
            kinds: 'rice',
            times: 2,
            effect: true
          }
        ]
      }
    }
  },
  {
    start: '2021-10-18',
    extendedProps: {
      first: {
        event: true,
        situation: 'love',
        detail: {
          level: 'high',
          kinds: ['hoge', 'fuga'],
          trigger: ['dog', 'cat'],
          memo: 'csktjfhgnsktghnskntghsktgjshnkgshcgkshngksjgnhsiguiskjctbg'
        },
        meals: [
          {
            kinds: 'rice',
            times: 2,
            effect: true
          }
        ]
      },
      second: {},
      third: {}
    }
  },
  {
    start : '2021-10-01',
    end : '2021-10-07',
    display: 'background',
    classNames: ['event-period']
  },
];