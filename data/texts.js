const texts = {
  global: {
    next: 'Næste',
    previous: 'Tilbage',
  },
  step0: {
    heading: 'yadiyada',
    popup: {
      title: 'Behandling af personoplysninger',
      message:
        'De oplysninger du indtaster i barselsplanlæggeren bliver ikke sendt til Udbetaling Danmark. Udbetaling Danmark behandler derfor ikke dine personoplysninger ifm., at du benytter barselsplanlæggeren.',
      acceptButtonText: 'Ok',
    },
  },
  step1: {
    heading: 'yadiyada',
    popup: {
      title: 'Du kan ikke benytte barselsplanlæggeren',
      message:
        'Hvis du er en forælder ved fødslen, dvs. der er ikke en anden forælder til barnet, kan du ikke benytte barselsplanlæggeren. Læs mere om din situation på www.borger.dk/barsel.',
      acceptButtonText: 'Læs mere på borger.dk',
      rejectButtonText: 'Start planlæggeren på ny',
      link: 'https://www.borger.dk',
    },
  },
  step2: {
    heading: 'yadiyada',
    popup: {
      title: 'Du kan ikke benytte barselsplanlæggeren',
      message:
        'Hvis du ikke boede sammen med barnets anden forælder ved fødslen, kan du ikke benytte barselsplanlæggeren. Læs mere om din situation på www.borger.dk/barsel.',
      acceptButtonText: 'Læs mere på borger.dk',
      rejectButtonText: 'Start planlæggeren på ny',
      link: 'https://www.borger.dk',
    },
  },
  // TODO: Different text for different scenarios
  selfEmployed: {
    popup: {
      title: 'selfEmployed-Du kan ikke benytte barselsplanlæggeren',
      message:
        'Hvis du eller barnets anden forælder har en anden beskæftigelse eller situation end lønmodtager, kan I ikke benytte barselsplanlæggeren. Du kan gå til borger.dk/barsel-selvstaendig, hvor du kan læse mere om din situation.',
      acceptButtonText: 'Læs mere på borger.dk',
      rejectButtonText: 'Start planlæggeren på ny',
      link: 'https://www.borger.dk/barsel-selvstaendig',
    },
  },
  student: {
    popup: {
      title: 'student-Du kan ikke benytte barselsplanlæggeren',
      message:
        'Hvis du eller barnets anden forælder har en anden beskæftigelse eller situation end lønmodtager, kan I ikke benytte barselsplanlæggeren. Du kan gå til borger.dk/barsel-studerende-og-nyuddannet, hvor du kan læse mere om din situation.',
      acceptButtonText: 'Læs mere på borger.dk',
      rejectButtonText: 'Start planlæggeren på ny',
      link: 'https://www.borger.dk/barsel-studerende-og-nyuddannet',
    },
  },
  unemployed: {
    popup: {
      title: 'Du kan ikke benytte barselsplanlæggeren',
      message:
        'Hvis du eller barnets anden forælder har en anden beskæftigelse eller situation end lønmodtager, kan I ikke benytte barselsplanlæggeren. Du kan gå til borger.dk/barsel-ledig, hvor du kan læse mere om din situation.',
      acceptButtonText: 'Læs mere på borger.dk',
      rejectButtonText: 'Start planlæggeren på ny',
      link: 'https://www.borger.dk/barsel-ledig',
    },
  },
  other: {
    popup: {
      title: 'Du kan ikke benytte barselsplanlæggeren',
      message:
        'Hvis du eller barnets anden forælder har en anden beskæftigelse eller situation end lønmodtager, kan I ikke benytte barselsplanlæggeren. Du kan gå til borger.dk/barsel, hvor du kan læse mere om din situation.',
      acceptButtonText: 'Læs mere på borger.dk',
      rejectButtonText: 'Start planlæggeren på ny',
      link: 'https://www.borger.dk/barsel',
    },
  },
};
export default texts;
