export type NoteType = {
  note_id: string;
  note_title: string;
  note_url?: string | '';
};

export const notes1 = [
  {
    id: 'Note1',
    note_title: 'Lecture 2 - Software Processes - Basics',
    note_url: '',
  },
  {
    id: 'Note2',
    note_title: 'Lecture 3 - Agile Software Development',
    note_url: '',
  },
  {
    id: 'Note3',
    note_title: 'Lecture 5 - Requirements',
    note_url: '',
  },
  {
    id: 'Note4',
    note_title: 'Lecture 5 - Requirements',
    note_url: '',
  },
  {
    id: 'Note5',
    note_title: 'Lecture 5 - Requirements',
    note_url: '',
  },
  {
    id: 'Note6',
    note_title: 'Lecture 5 - Requirements',
    note_url: '',
  },
  {
    id: 'Note7',
    note_title: 'Lecture 5 - Requirements',
    note_url: '',
  },
  {
    id: 'Note8',
    note_title: 'Lecture 5 - Requirements',
    note_url: '',
  },
  {
    id: 'Note9',
    note_title: 'Lecture 5 - Requirements',
    note_url: '',
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
  subject_id: string;
  subject_title: string;
  subject_category: string;
  notes?: NoteType[] | [];
};

export const subjectsData: SubjectType[] = [
  {
    subject_id: 'Main1',
    subject_title: 'SC2006 - Software Engineering',
    subject_category: 'Technology - Software Developement',
  },
  {
    subject_id: 'Main2',
    subject_title: 'SC1004 - Linear Algebra',
    subject_category: 'Mathematics',
  },
  {
    subject_id: 'Main3',
    subject_title: 'SC1004 - Linear Algebra',
    subject_category: 'Mathematics',
  },
  {
    subject_id: 'Main4',
    subject_title: 'SC1004 - Linear Algebra',
    subject_category: 'Mathematics',
  },
  {
    subject_id: 'Main5',
    subject_title: 'SC1004 - Linear Algebra',
    subject_category: 'Mathematics',
  },
  {
    subject_id: 'Main6',
    subject_title: 'SC1004 - Linear Algebra',
    subject_category: 'Mathematics',
  },
  {
    subject_id: 'Main72',
    subject_title: 'SC100700 - Linear Algebra',
    subject_category: 'Mathematics',
  },
];

export type ChoiceType = {
  choice: string;
};

export type QuestionType = {
  question_id?: number;
  quiz_id: number;
  question: string;
  choice?: ChoiceType[];
  answer: ChoiceType;
};

export type QuizType = {
  quiz_id?: number;
  quiz_title: string;
  quiz_subject_id: number;
  quiz_score: number;
  questions?: QuestionType[];
};

export type QuizSubjectType = {
  quizSubjectTitle: string;
  quizSubjects: QuizType[];
};

// export const question1Data: QuestionType[] = [
//   {
//     question: 'What is not the principal of Agile Software Development?',
//     choice: [
//       'Following the plan',
//       'Embrance Change',
//       'Customer involvement',
//       'Incremental Delivery',
//     ],
//     answer: 'Following the plan',
//   },
//   {
//     question: 'Question 2',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer D',
//   },
//   {
//     question: 'Question 3',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer A',
//   },
//   {
//     question: 'Question 4',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer B',
//   },
// ];

// export const question2Data: QuestionType[] = [
//   {
//     question: 'Question 1',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer A',
//   },
//   {
//     question: 'Question 2',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer B',
//   },
//   {
//     question: 'Question 3',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer C',
//   },
// ];

// export const question3Data: QuestionType[] = [
//   {
//     question: 'Question 1',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer D',
//   },
//   {
//     question: 'Question 2',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer C',
//   },
//   {
//     question: 'Question 3',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer B',
//   },
// ];

// export const question4Data: QuestionType[] = [
//   {
//     question: 'Question 1',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer A',
//   },
//   {
//     question: 'Question 2',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer C',
//   },
//   {
//     question: 'Question 3',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer A',
//   },
// ];
// export const question5Data: QuestionType[] = [
//   {
//     question: 'Question 1',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer D',
//   },
//   {
//     question: 'Question 2',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer A',
//   },
//   {
//     question: 'Question 3',
//     choice: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
//     answer: 'Answer B',
//   },
// ];

// export const quiz1Data: QuizType[] = [
//   {
//     quizTitle: 'Lecture 3 - Agile Software Development',
//     questions: question1Data,
//     recentScore: -1,
//   },
//   {
//     quizTitle: 'Lecture 2 - Software Processes - Basics',
//     questions: question2Data,
//     recentScore: -1,
//   },
// ];

// export const quiz2Data: QuizType[] = [
//   {
//     quizTitle: 'Lecture 1 - Database Principals',
//     questions: question5Data,
//     recentScore: -1,
//   },
//   {
//     quizTitle: 'Lecture 2 - Database Designs',
//     questions: question4Data,
//     recentScore: -1,
//   },
// ];

// export const quiz3Data: QuizType[] = [
//   {
//     quizTitle: 'Lecture 1 - Vectors',
//     questions: question5Data,
//     recentScore: -1,
//   },
// ];

// export const quizSubject1Data: QuizSubjectType = {
//   quizSubjectTitle: 'SC2006 - Software Engineering',
//   quizSubjects: quiz1Data,
// };

// export const quizSubject2Data: QuizSubjectType = {
//   quizSubjectTitle: 'SC2024 - Database Systems',
//   quizSubjects: quiz2Data,
// };

// export const quizSubject3Data: QuizSubjectType = {
//   quizSubjectTitle: 'SC1004 - Linear Algebra',
//   quizSubjects: quiz3Data,
// };

// export const quizSubjectsData: QuizSubjectType[] = [
//   quizSubject1Data,
//   quizSubject2Data,
// ];

export interface Card {
  answer: string;
  id: string;
  question: string;
  image?: any;
  set: string;
}

export const getLearnCards = [
  {
    answer: 'Answer',
    id: '1',
    question: 'Questions',
    image: null,
    set: 'study',
  },
  {
    answer: 'Answer',
    id: '1',
    question: 'Questions',
    image: null,
    set: 'study',
  },
];
