import type { Question } from "@/store/slices/examSlice";

export interface MockTest {
  id: string;
  title: string;
  candidatesCount: number;
  questionSetCount: number;
  examSlotsCount: number;
  duration?: string;
  questions?: number;
  negativeMarking?: string;
  totalSlots?: string;
  questionType?: string;
  startTime?: string;
  endTime?: string;
  questionsList?: Question[];
}

export const mockTests: MockTest[] = [
  {
    id: "1",
    title: "Psychometric Test for Management Trainee Officer",
    candidatesCount: 10000,
    questionSetCount: 3,
    examSlotsCount: 3,
    duration: "30 min",
    questions: 25,
    negativeMarking: "-0.25/wrong",
  },
  {
    id: "2",
    title: "Software Engineer Technical Assessment",
    candidatesCount: 450,
    questionSetCount: 2,
    examSlotsCount: 5,
    duration: "60 min",
    questions: 40,
    negativeMarking: "-0.50/wrong",
  },
  {
    id: "3",
    title: "Marketing Executive Aptitude Test",
    candidatesCount: 1200,
    questionSetCount: 1,
    examSlotsCount: 2,
    duration: "45 min",
    questions: 30,
    negativeMarking: "-0.25/wrong",
  },
  {
    id: "4",
    title: "Data Analyst Proficiency Exam",
    candidatesCount: 850,
    questionSetCount: 4,
    examSlotsCount: 2,
    duration: "90 min",
    questions: 50,
    negativeMarking: "-0.50/wrong",
  },
  {
    id: "5",
    title: "Customer Support English Proficiency",
    candidatesCount: 2100,
    questionSetCount: 1,
    examSlotsCount: 4,
    duration: "20 min",
    questions: 15,
    negativeMarking: "None",
  },
  {
    id: "6",
    title: "Frontend Developer React Assessment",
    candidatesCount: 340,
    questionSetCount: 2,
    examSlotsCount: 1,
    duration: "60 min",
    questions: 35,
    negativeMarking: "-0.25/wrong",
  },
  {
    id: "7",
    title: "Backend Developer Node.js Assessment",
    candidatesCount: 290,
    questionSetCount: 2,
    examSlotsCount: 1,
    duration: "60 min",
    questions: 30,
    negativeMarking: "-0.25/wrong",
  },
  {
    id: "8",
    title: "Product Manager Scenario Test",
    candidatesCount: 150,
    questionSetCount: 3,
    examSlotsCount: 2,
    duration: "45 min",
    questions: 20,
    negativeMarking: "None",
  },
  {
    id: "9",
    title: "UI/UX Designer Portfolio & Quiz",
    candidatesCount: 500,
    questionSetCount: 2,
    examSlotsCount: 3,
    duration: "30 min",
    questions: 20,
    negativeMarking: "-0.25/wrong",
  },
  {
    id: "10",
    title: "DevOps Engineer Infrastructure Quiz",
    candidatesCount: 180,
    questionSetCount: 4,
    examSlotsCount: 2,
    duration: "75 min",
    questions: 45,
    negativeMarking: "-0.50/wrong",
  },
];
