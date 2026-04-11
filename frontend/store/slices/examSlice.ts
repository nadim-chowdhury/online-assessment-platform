import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockTests, MockTest } from "@/lib/mock-tests";

export interface QuestionOption {
  label: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: number;
  title: string;
  type: "MCQ" | "Checkbox" | "Text";
  points: number;
  questionText: string;
  textAnswer: string | null;
  options: QuestionOption[];
}

export interface ExamState {
  tests: MockTest[];
  questions: Question[];
  nextQuestionId: number;
  nextTestId: number;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    title: "Question 1",
    type: "MCQ",
    points: 1,
    questionText: "What is the Capital of Bangladesh?",
    textAnswer: null,
    options: [
      { label: "A", text: "Dhaka", correct: true },
      { label: "B", text: "Chattogram", correct: false },
      { label: "C", text: "Rajshahi", correct: false },
      { label: "D", text: "Barishal", correct: false },
    ],
  },
  {
    id: 2,
    title: "Question 2",
    type: "Checkbox",
    points: 1,
    questionText: "What is the Capital of Bangladesh?",
    textAnswer: null,
    options: [
      { label: "A", text: "Dhaka", correct: true },
      { label: "B", text: "Chattogram", correct: false },
      { label: "C", text: "Rajshashi", correct: true },
      { label: "D", text: "Barishal", correct: false },
    ],
  },
  {
    id: 3,
    title: "Question 3",
    type: "Text",
    points: 5,
    questionText: "Write a brief of your capital city",
    options: [],
    textAnswer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
  },
];

const initialState: ExamState = {
  tests: mockTests,
  questions: initialQuestions,
  nextQuestionId: 4,
  nextTestId: mockTests.length + 1,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<Omit<Question, "id" | "title">>) {
      const id = state.nextQuestionId;
      state.questions.push({
        ...action.payload,
        id,
        title: `Question ${id}`,
      });
      state.nextQuestionId += 1;
    },

    updateQuestion(
      state,
      action: PayloadAction<{ id: number; updates: Partial<Question> }>,
    ) {
      const idx = state.questions.findIndex((q) => q.id === action.payload.id);
      if (idx !== -1) {
        state.questions[idx] = {
          ...state.questions[idx],
          ...action.payload.updates,
        };
      }
    },

    removeQuestion(state, action: PayloadAction<number>) {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
    },

    resetQuestions(state) {
      state.questions = [];
      state.nextQuestionId = 1;
    },

    addTest(state, action: PayloadAction<Omit<MockTest, "id">>) {
      const newId = String(state.nextTestId);
      state.tests.unshift({ ...action.payload, id: newId });
      state.nextTestId += 1;
    },

    updateTest(
      state,
      action: PayloadAction<{ id: string; updates: Partial<MockTest> }>,
    ) {
      const idx = state.tests.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.tests[idx] = {
          ...state.tests[idx],
          ...action.payload.updates,
        };
      }
    },

    removeTest(state, action: PayloadAction<string>) {
      state.tests = state.tests.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  addQuestion,
  updateQuestion,
  removeQuestion,
  resetQuestions,
  addTest,
  updateTest,
  removeTest,
} = examSlice.actions;
export default examSlice.reducer;
