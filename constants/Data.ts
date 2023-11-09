export type noteType = {
  id: string;
  noteTitle: string;
  pdfUrl?: string;
};

export const notes1: noteType[] = [
  {
    id: 'Note1',
    noteTitle: 'Lecture 2 - Software Processes - Basics',
    pdfUrl: '',
  },
  {
    id: 'Note2',
    noteTitle: 'Lecture 3 - Agile Software Development',
    pdfUrl: '',
  },
  {
    id: 'Note3',
    noteTitle: 'Lecture 5 - Requirements',
    pdfUrl: '',
  },
];

export const notes2: noteType[] = [
  {
    id: 'Note1',
    noteTitle: 'Lecture 1 - System of Linear Equations',
    pdfUrl: '',
  },
  {
    id: 'Note2',
    noteTitle: 'Lecture 3 - Determinants',
    pdfUrl: '',
  },
  {
    id: 'Note3',
    noteTitle: 'Lecture 4 - Vector Spaces',
    pdfUrl: '',
  },
];

export type mainNoteType = {
  id: string;
  title: string;
  category?: string;
  notes?: noteType[];
};

export const mainNote: mainNoteType[] = [
  {
    id: 'Main1',
    title: 'SC2006 - Software Engineering',
    category: 'Technology - Software Developement',
    notes: notes1,
  },
  {
    id: 'Main2',
    title: 'SC1004 - Linear Algebra',
    category: 'Mathematics',
    notes: notes2,
  },
  {
    id: 'Main3',
    title: 'SC1004 - Linear Algebra',
    category: 'Mathematics',
    notes: notes2,
  },
  {
    id: 'Main4',
    title: 'SC1004 - Linear Algebra',
    category: 'Mathematics',
    notes: notes2,
  },
  {
    id: 'Main5',
    title: 'SC1004 - Linear Algebra',
    category: 'Mathematics',
    notes: notes2,
  },
  {
    id: 'Main6',
    title: 'SC1004 - Linear Algebra',
    category: 'Mathematics',
    notes: notes2,
  },
  {
    id: 'Main72',
    title: 'SC100700 - Linear Algebra',
    category: 'Mathematics',
    notes: notes2,
  },
];
