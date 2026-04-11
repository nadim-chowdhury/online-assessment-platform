import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockTests, MockTest } from "@/lib/mock-tests";

// ─── Question Types ─────────────────────────────────────────────
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

// ─── Exam/Test State ────────────────────────────────────────────
export interface ExamState {
  /** All available tests */
  tests: MockTest[];
  /** Questions for the currently active test (employer create/edit flow) */
  questions: Question[];
  /** Counter for generating unique question IDs */
  nextQuestionId: number;
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
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    // ─── Question CRUD ──────────────────────────────────────────
    addQuestion(
      state,
      action: PayloadAction<Omit<Question, "id" | "title">>,
    ) {
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
      const idx = state.questions.findIndex(
        (q) => q.id === action.payload.id,
      );
      if (idx !== -1) {
        state.questions[idx] = {
          ...state.questions[idx],
          ...action.payload.updates,
        };
      }
    },

    removeQuestion(state, action: PayloadAction<number>) {
      state.questions = state.questions.filter(
        (q) => q.id !== action.payload,
      );
    },

    // ─── Test List Management ───────────────────────────────────
    addTest(state, action: PayloadAction<Omit<MockTest, "id">>) {
      const newId = String(state.tests.length + 1);
      state.tests.push({ ...action.payload, id: newId });
    },
  },
});

export const { addQuestion, updateQuestion, removeQuestion, addTest } =
  examSlice.actions;
export default examSlice.reducer;
