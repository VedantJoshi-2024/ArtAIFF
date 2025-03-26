export interface ScheduleItem {
  time: string;
  title: string;
  subtitle: string;
  locations: string[];
}

const scheduleData: {[key: string]: ScheduleItem[]} = {
  '29 Mar': [
    {
      time: '9:15 - 11:20',
      title: 'Perfect Days',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '11:30 - 1:30',
      title: 'Indian Film 1: Mithya (Kannada) + Q&A',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '11:30 - 1:30',
      title: 'Short Film Block 1',
      subtitle: '',
      locations: ['AB-10 103'],
    },
    {
      time: '2:00 - 3:40',
      title: 'The 400 Blows',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '2:00 - 3:40',
      title: 'Contempt',
      subtitle: '',
      locations: ['AB-10 103'],
    },
    {
      time: '3:45 - 5:40',
      title: 'Priscilla',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '3:45 - 5:40',
      title: 'Panel Discussion (Sumanth Bhat & Jithin Isaac Thomas with Ahnas)',
      subtitle: '',
      locations: ['AB-10 103'],
    },
    {
      time: '6:00 - 7:35',
      title: 'Indian Film 2: Pattth (Malayalam) + Q&A (Jitin Isaac Verghese)',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '6:00 - 7:35',
      title: 'Short Film Block 2',
      subtitle: '',
      locations: ['New PC (Panchangana)'],
    },
    {
      time: '8:00 - 9:45',
      title: 'A Summer’s Tale',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '8:00 - 9:45',
      title: 'Petite Maman',
      subtitle: '',
      locations: ['AB-10 103'],
    },
    {
      time: '8:00 - 9:45',
      title: 'Grand Theft Hamlet (GTA)',
      subtitle: '',
      locations: ['New PC (Panchangana)'],
    },
    {
      time: '9:15 - 11:20',
      title: 'Perfect Days',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '11:30 - 1:30',
      title: 'Indian Film 1: Mithya (Kannada) + Q&A',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '11:30 - 1:30',
      title: 'Short Film Block 1',
      subtitle: '',
      locations: ['AB-10 103'],
    },
    {
      time: '2:00 - 3:40',
      title: 'The 400 Blows',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '2:00 - 3:40',
      title: 'Contempt',
      subtitle: '',
      locations: ['AB-10 103'],
    },
  ],
  '30 Mar': [
    {
      time: '9:30 - 11:15',
      title: 'Close',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '11:30 - 1:30',
      title: 'Guras',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '11:30 - 1:30',
      title: 'Masterclass on Directing Actors (Pushpendra Singh)',
      subtitle: '',
      locations: ['AB-10 103'],
    },
    {
      time: '2:00 - 4:00',
      title: 'Rapture (Dominic Sangma) + Q&A with Cinematographer',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '4:00 - 6:00',
      title: 'Shiva Baby',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '4:00 - 6:00',
      title: 'Masterclass on Cinematography (Tojo Xavier)',
      subtitle: '',
      locations: ['AB-10 103'],
    },
    {
      time: '6:00 - 7:35',
      title: 'Pearl of the Desert (Pushpendra Singh)',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '6:00 - 7:35',
      title: 'Short Film Block 3',
      subtitle: '',
      locations: ['New PC (Panchangana)'],
    },
    {
      time: '8:00 - 9:45',
      title: 'Jules and Jim',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '8:00 - 9:45',
      title: 'Short Films Block 4',
      subtitle: '',
      locations: ['AB-10 103'],
    },
    {
      time: '8:00 - 9:45',
      title: 'Zazie in the Metro',
      subtitle: '',
      locations: ['New PC (Panchangana)'],
    },
  ],
  '31 Mar': [
    {
      time: '9:30 - 11:20',
      title: 'Second Chance (Subhadra Mahajan) + Q&A',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '11:30 - 1:10',
      title: 'Alphaville',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '11:30 - 1:10',
      title: 'Short Film Block 5',
      subtitle: '',
      locations: ['AB-10 103'],
    },
    {
      time: '2:00 - 3:40',
      title: 'Hiroshima Mon Amour',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
    {
      time: '2:00 - 3:40',
      title: 'Short Film Block 6',
      subtitle: '',
      locations: ['AB-10 103'],
    },
    {
      time: '4:00 - 6:00',
      title: 'Closing Ceremony',
      subtitle: '',
      locations: ['Jibaben Patel (Kanisa) Memorial Auditorium'],
    },
  ],
};

export default scheduleData;