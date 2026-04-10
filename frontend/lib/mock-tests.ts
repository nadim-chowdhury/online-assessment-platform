export interface MockTest {
  id: string;
  title: string;
  candidatesCount: number;
  questionSetCount: number;
  examSlotsCount: number;
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
];
