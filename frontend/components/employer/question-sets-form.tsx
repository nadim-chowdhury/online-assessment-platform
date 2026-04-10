"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ChevronDown,
  Trash2,
  Undo2,
  Redo2,
  List,
  Plus,
  CheckCircle2,
} from "lucide-react";

const RichEditor = ({ minHeight = "120px" }: { minHeight?: string }) => {
  const execCommand = (
    command: string,
    value: string | undefined = undefined,
  ) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="flex flex-col border border-border rounded-xl bg-card overflow-hidden shadow-xs">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 border-b border-border p-2.5 px-4 bg-muted/30">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCommand("undo")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCommand("redo")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Redo2 className="h-4 w-4" />
          </button>
        </div>

        <div className="w-px h-4 bg-border/80 hidden sm:block" />

        <div className="relative flex items-center">
          <select
            onMouseDown={(e) => e.preventDefault()}
            onChange={(e) => execCommand("formatBlock", e.target.value)}
            defaultValue="P"
            className="appearance-none bg-transparent text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus:outline-none pr-5 py-1"
          >
            <option value="P">Normal text</option>
            <option value="H1">Heading 1</option>
            <option value="H2">Heading 2</option>
            <option value="H3">Heading 3</option>
          </select>
          <ChevronDown className="h-3.5 w-3.5 absolute right-0 pointer-events-none text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 border-l border-r border-border/80 px-2.5 sm:px-3">
          <button
            type="button"
            title="Unordered List"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCommand("insertUnorderedList")}
            className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Ordered List"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCommand("insertOrderedList")}
            className="flex items-center justify-center text-muted-foreground hover:text-foreground font-bold font-sans text-[13px] w-4 h-4 leading-none tracking-tight transition-colors"
          >
            1.
          </button>
        </div>

        <div className="flex items-center gap-3.5 ml-0.5">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCommand("bold")}
            className="text-muted-foreground hover:text-foreground font-serif font-bold text-[14.5px] transition-colors"
          >
            B
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCommand("italic")}
            className="text-muted-foreground hover:text-foreground font-serif italic text-[14.5px] transition-colors"
          >
            I
          </button>
        </div>
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="p-4 bg-card focus-within:ring-0 focus-visible:outline-none custom-scrollbar"
        style={{ minHeight }}
      />
    </div>
  );
};

type OptionItem = {
  id: string;
  label: string;
};

const DUMMY_QUESTIONS = [
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

export function QuestionSetsForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [questionType, setQuestionType] = useState("checkbox");

  const defaultOptions: OptionItem[] = [
    { id: "opt-1", label: "A" },
    { id: "opt-2", label: "B" },
    { id: "opt-3", label: "C" },
  ];
  const [options, setOptions] = useState<OptionItem[]>(defaultOptions);

  const handleAddOption = () => {
    setOptions((prev) => {
      const nextIndex = prev.length;
      const nextLabel = String.fromCharCode(65 + nextIndex); // 65 is 'A' -> A, B, C...
      return [...prev, { id: `opt-${Date.now()}`, label: nextLabel }];
    });
  };

  const handleDeleteOption = (idToRemove: string) => {
    setOptions((prev) => {
      // Don't allow deleting if there are less than 2 options
      if (prev.length <= 2) return prev;

      const filtered = prev.filter((opt) => opt.id !== idToRemove);
      // Re-assign alphabetic labels so they remain sequential (A, B, C...)
      return filtered.map((opt, index) => ({
        ...opt,
        label: String.fromCharCode(65 + index),
      }));
    });
  };

  const handleDeleteQuestion = () => {
    // Reset state to defaults and close modal
    setIsOpen(false);
    setTimeout(() => {
      setOptions(defaultOptions);
      setQuestionType("checkbox");
    }, 300); // Wait for Dialog transiton
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Display Saved Questions List */}
      <div className="flex flex-col gap-5">
        {DUMMY_QUESTIONS.map((q) => (
          <div
            key={q.id}
            className="bg-card border border-border/80 rounded-[12px] p-6 sm:p-7 flex flex-col shadow-xs"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <h3 className="text-[14.5px] font-bold text-foreground">
                {q.title}
              </h3>
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full border border-border text-[12px] font-semibold text-muted-foreground bg-white">
                  {q.type}
                </span>
                <span className="px-3.5 py-1 rounded-full border border-border text-[12px] font-semibold text-muted-foreground bg-white">
                  {q.points} pt
                </span>
              </div>
            </div>

            {/* Question Definition Layer */}
            <div className="py-5">
              <h4 className="text-[14.5px] font-bold text-foreground mb-4">
                {q.questionText}
              </h4>

              {q.options.length > 0 ? (
                <div className="flex flex-col gap-2.5">
                  {q.options.map((opt) => (
                    <div
                      key={opt.label}
                      className={`flex items-center justify-between px-4 py-[14px] rounded-[8px] text-[13.5px] font-medium transition-colors ${
                        opt.correct
                          ? "bg-muted/50 text-foreground"
                          : "bg-transparent text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span>{opt.label}.</span>
                        <span>{opt.text}</span>
                      </div>
                      {opt.correct && (
                        <CheckCircle2
                          className="w-[18px] h-[18px] text-[#22c55e]"
                          strokeWidth={2.5}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[13.5px] text-muted-foreground leading-relaxed mt-2 bg-transparent text-justify tracking-wide">
                  {q.textAnswer}
                </p>
              )}
            </div>

            {/* Footer Action Links */}
            <div className="flex items-center justify-between pt-4 pb-1 border-t border-border/60">
              <button
                type="button"
                className="text-accent text-[13.5px] font-semibold tracking-wide hover:opacity-80 transition-opacity"
              >
                Edit
              </button>
              <button
                type="button"
                className="text-destructive/80 text-[13.5px] font-semibold tracking-wide hover:opacity-80 transition-opacity"
              >
                Remove From Exam
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <div
            className="flex items-center justify-center w-full h-[52px] rounded-[10px] bg-accent hover:bg-accent/90 text-white text-[15px] font-semibold transition-colors shadow-xs cursor-pointer my-4"
            onClick={() => setIsOpen(true)}
          >
            Add Question
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-3xl w-[95vw] p-0 rounded-[16px] bg-card border border-border shadow-lg overflow-hidden flex flex-col gap-0 [&>button]:hidden">
          <div className="max-h-[85vh] overflow-y-auto custom-scrollbar p-6 sm:p-7">
            {/* Top Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full pb-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px] rounded-full border border-border flex items-center justify-center text-[12.5px] font-semibold text-muted-foreground bg-muted/20">
                  1
                </div>
                <span className="text-[16px] font-bold text-foreground tracking-tight">
                  Question 1
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-semibold text-foreground tracking-tight">
                    Score:
                  </span>
                  <Input
                    type="number"
                    defaultValue={1}
                    className="w-[56px] h-[34px] text-center p-0 rounded-[8px] text-[13.5px] font-medium text-foreground border border-border focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent"
                  />
                </div>

                <div className="relative">
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="h-[34px] w-[110px] appearance-none bg-card border border-border rounded-[8px] px-3.5 pr-8 text-[13px] font-semibold text-foreground focus:ring-1 focus:ring-accent outline-none cursor-pointer"
                  >
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="text">Text</option>
                  </select>
                  <ChevronDown className="h-[14px] w-[14px] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground stroke-[2.5]" />
                </div>

                <button
                  type="button"
                  onClick={handleDeleteQuestion}
                  className="text-muted-foreground hover:text-destructive transition-colors ml-1"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Question Editor */}
            <RichEditor minHeight="110px" />

            {/* Options List */}
            <div className="flex flex-col mt-7 gap-5 ml-6">
              {(questionType === "text" ? options.slice(0, 1) : options).map((opt) => (
                <div
                  key={opt.id}
                  className="flex flex-col gap-3 animate-in fade-in duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-[28px] h-[28px] rounded-full border border-border flex items-center justify-center text-[12.5px] font-bold text-muted-foreground bg-muted/20">
                        {opt.label}
                      </div>
                      {questionType !== "text" && (
                        <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                          <input
                            type={questionType}
                            name={
                              questionType === "radio"
                                ? "correct-answer-group"
                                : `correct-answer-${opt.id}`
                            }
                            className="w-[16px] h-[16px] rounded-[4px] border-[1.5px] border-border text-accent focus:ring-1 focus:ring-accent focus:ring-offset-0 cursor-pointer accent-accent"
                          />
                          <span className="text-[13px] text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                            Set as correct answer
                          </span>
                        </label>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteOption(opt.id)}
                      disabled={questionType !== "text" && options.length <= 2}
                      className="text-muted-foreground hover:text-destructive disabled:opacity-50 disabled:hover:text-muted-foreground transition-colors px-1"
                    >
                      <Trash2 className="h-[18px] w-[18px]" />
                    </button>
                  </div>

                  <RichEditor minHeight="70px" />
                </div>
              ))}
            </div>

            {/* Add Option Trigger */}
            {questionType !== "text" && (
              <div className="mt-6 px-1 pb-2 ml-6">
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="flex items-center gap-2 text-accent text-[13.5px] font-semibold hover:opacity-80 transition-opacity"
                >
                  <Plus className="h-4 w-4 stroke-[2.5]" /> Another options
                </button>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-accent text-accent hover:bg-accent/5 font-semibold px-8 h-[46px] rounded-[10px] text-[14px]"
              >
                Save
              </Button>
              <Button className="bg-accent text-white hover:bg-accent/90 font-semibold px-8 h-[46px] rounded-[10px] text-[14px] shadow-xs">
                Save & Add More
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
