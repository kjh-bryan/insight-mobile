export type NoteType = {
  id: string;
  noteTitle: string;
  pdfUrl?: string | '';
};

export const notes1 = [
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
  {
    id: 'Note4',
    noteTitle: 'Lecture 5 - Requirements',
    pdfUrl: '',
  },
  {
    id: 'Note5',
    noteTitle: 'Lecture 5 - Requirements',
    pdfUrl: '',
  },
  {
    id: 'Note6',
    noteTitle: 'Lecture 5 - Requirements',
    pdfUrl: '',
  },
  {
    id: 'Note7',
    noteTitle: 'Lecture 5 - Requirements',
    pdfUrl: '',
  },
  {
    id: 'Note8',
    noteTitle: 'Lecture 5 - Requirements',
    pdfUrl: '',
  },
  {
    id: 'Note9',
    noteTitle: 'Lecture 5 - Requirements',
    pdfUrl: '',
  },
];

export const notes2 = [
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

export type SubjectType = {
  id: string;
  title: string;
  category: string;
  notes?: NoteType[] | [];
};

export const subjectsData: SubjectType[] = [
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
