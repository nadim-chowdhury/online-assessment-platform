export interface MockTest {
  id: string;
  title: string;
  candidatesCount: number;
  questionSetCount: number;
  examSlotsCount: number;
  duration?: string;
  questions?: number;
  negativeMarking?: string;
}

export const mockTests: MockTest[] = [
  {
    id: "1",
    title: "Psychometric Test for Management Trainee Officer",
    candidatesCount: 10000,
    questionSetCount: 3,
    examSlotsCount: 3,
  },
  {
    id: "2",
    title: "Software Engineer Technical Assessment",
    candidatesCount: 450,
    questionSetCount: 2,
    examSlotsCount: 5,
  },
  {
    id: "3",
    title: "Marketing Executive Aptitude Test",
    candidatesCount: 1200,
    questionSetCount: 1,
    examSlotsCount: 2,
  },
  {
    id: "4",
    title: "Data Analyst Proficiency Exam",
    candidatesCount: 850,
    questionSetCount: 4,
    examSlotsCount: 2,
  },
  {
    id: "5",
    title: "Customer Support English Proficiency",
    candidatesCount: 2100,
    questionSetCount: 1,
    examSlotsCount: 4,
  },
  {
    id: "6",
    title: "Frontend Developer React Assessment",
    candidatesCount: 340,
    questionSetCount: 2,
    examSlotsCount: 1,
  },
  {
    id: "7",
    title: "Backend Developer Node.js Assessment",
    candidatesCount: 290,
    questionSetCount: 2,
    examSlotsCount: 1,
  },
  {
    id: "8",
    title: "Product Manager Scenario Test",
    candidatesCount: 150,
    questionSetCount: 3,
    examSlotsCount: 2,
  },
  {
    id: "9",
    title: "UI/UX Designer Portfolio & Quiz",
    candidatesCount: 500,
    questionSetCount: 2,
    examSlotsCount: 3,
  },
  {
    id: "10",
    title: "DevOps Engineer Infrastructure Quiz",
    candidatesCount: 180,
    questionSetCount: 4,
    examSlotsCount: 2,
  },
];
