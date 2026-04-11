"use client";

import { useState, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  removeQuestion,
  addQuestion,
  updateQuestion,
  Question,
  QuestionOption,
} from "@/store/slices/examSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, Trash2, Plus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { RichEditor } from "@/components/common/rich-editor";

type OptionItem = {
  id: string;
  label: string;
};

export function QuestionSetsForm() {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.exam.questions);
  const [isOpen, setIsOpen] = useState(false);
  const [questionType, setQuestionType] = useState("checkbox");
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const questionEditorRef = useRef<HTMLDivElement>(null);
  const optionEditorRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const scoreInputRef = useRef<HTMLInputElement>(null);
  const correctAnswersRef = useRef<Set<string>>(new Set());

  const defaultOptions: OptionItem[] = [
    { id: "opt-1", label: "A" },
    { id: "opt-2", label: "B" },
    { id: "opt-3", label: "C" },
  ];
  const [options, setOptions] = useState<OptionItem[]>(defaultOptions);

  const setOptionRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      optionEditorRefs.current.set(id, el);
    } else {
      optionEditorRefs.current.delete(id);
    }
  }, []);

  const handleAddOption = () => {
    setOptions((prev) => {
      const nextIndex = prev.length;
      const nextLabel = String.fromCharCode(65 + nextIndex); // 65 is 'A' -> A, B, C...
      return [...prev, { id: `opt-${Date.now()}`, label: nextLabel }];
    });
  };

  const handleDeleteOption = (idToRemove: string) => {
    setOptions((prev) => {
      if (prev.length <= 2) return prev;

      const filtered = prev.filter((opt) => opt.id !== idToRemove);
      return filtered.map((opt, index) => ({
        ...opt,
        label: String.fromCharCode(65 + index),
      }));
    });
  };

  const resetModalState = useCallback(() => {
    setOptions(defaultOptions);
    setQuestionType("checkbox");
    setEditingQuestion(null);
    correctAnswersRef.current.clear();
    optionEditorRefs.current.clear();
  }, []);

  const handleDeleteQuestion = () => {
    setIsOpen(false);
    setTimeout(() => {
      resetModalState();
    }, 300);
  };

  const collectQuestionData = useCallback((): Omit<
    Question,
    "id" | "title"
  > | null => {
    const rawText = questionEditorRef.current?.innerText?.trim() || "";
    if (!rawText) return null;

    const questionText = questionEditorRef.current?.innerHTML?.trim() || "";

    const score = scoreInputRef.current
      ? Number(scoreInputRef.current.value) || 1
      : 1;

    let type: Question["type"] = "MCQ";
    if (questionType === "checkbox") type = "Checkbox";
    else if (questionType === "text") type = "Text";
    else if (questionType === "radio") type = "MCQ";

    if (type === "Text") {
      const firstOptionEl = optionEditorRefs.current.values().next().value;
      const textAnswer = firstOptionEl?.innerHTML?.trim() || "";
      return {
        type,
        points: score,
        questionText,
        textAnswer,
        options: [],
      };
    }

    const builtOptions: QuestionOption[] = options.map((opt) => {
      const el = optionEditorRefs.current.get(opt.id);
      const text = el?.innerHTML?.trim() || "";
      const correct = correctAnswersRef.current.has(opt.id);
      return { label: opt.label, text, correct };
    });

    return {
      type,
      points: score,
      questionText,
      textAnswer: null,
      options: builtOptions,
    };
  }, [questionType, options]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      resetModalState();
    }, 300);
  }, [resetModalState]);

  const handleSave = useCallback(() => {
    const data = collectQuestionData();
    if (!data) {
      toast.error("Please enter a question before saving.");
      return;
    }

    if (editingQuestion) {
      dispatch(updateQuestion({ id: editingQuestion.id, updates: data }));
    } else {
      dispatch(addQuestion(data));
    }

    setIsOpen(false);
    setTimeout(() => {
      resetModalState();
    }, 300);
  }, [collectQuestionData, dispatch, editingQuestion, resetModalState]);

  const handleSaveAndAddMore = useCallback(() => {
    const data = collectQuestionData();
    if (!data) return;

    if (editingQuestion) {
      dispatch(updateQuestion({ id: editingQuestion.id, updates: data }));
    } else {
      dispatch(addQuestion(data));
    }

    resetModalState();
    if (questionEditorRef.current) {
      questionEditorRef.current.innerHTML = "";
    }
    optionEditorRefs.current.forEach((el) => {
      el.innerHTML = "";
    });
    if (scoreInputRef.current) {
      scoreInputRef.current.value = "1";
    }
  }, [collectQuestionData, dispatch, editingQuestion, resetModalState]);

  const handleEditQuestion = useCallback((q: Question) => {
    setEditingQuestion(q);
    if (q.type === "MCQ") setQuestionType("radio");
    else if (q.type === "Checkbox") setQuestionType("checkbox");
    else setQuestionType("text");

    if (q.options.length > 0) {
      const mapped = q.options.map((opt, i) => ({
        id: `edit-opt-${i}`,
        label: opt.label,
      }));
      setOptions(mapped);
      correctAnswersRef.current.clear();
      q.options.forEach((opt, i) => {
        if (opt.correct) {
          correctAnswersRef.current.add(`edit-opt-${i}`);
        }
      });
    } else {
      setOptions([{ id: "edit-opt-0", label: "A" }]);
    }

    setIsOpen(true);
  }, []);

  const handleCorrectAnswerChange = useCallback(
    (optId: string, checked: boolean) => {
      if (questionType === "radio") {
        correctAnswersRef.current.clear();
        if (checked) {
          correctAnswersRef.current.add(optId);
        }
      } else {
        if (checked) {
          correctAnswersRef.current.add(optId);
        } else {
          correctAnswersRef.current.delete(optId);
        }
      }
    },
    [questionType],
  );

  const modalQuestionNumber = editingQuestion
    ? editingQuestion.id
    : questions.length + 1;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Display Saved Questions List */}
      <div className="flex flex-col gap-5">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-card rounded-[12px] p-6 sm:p-7 flex flex-col shadow-xs"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <h3 className="text-[14.5px] font-bold text-foreground">
                {q.title}
              </h3>
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full border border-border text-[12px] font-semibold text-muted-foreground bg-card">
                  {q.type}
                </span>
                <span className="px-3.5 py-1 rounded-full border border-border text-[12px] font-semibold text-muted-foreground bg-card">
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
                onClick={() => handleEditQuestion(q)}
                className="text-accent text-[13.5px] font-semibold tracking-wide hover:opacity-80 transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => dispatch(removeQuestion(q.id))}
                className="text-destructive/80 text-[13.5px] font-semibold tracking-wide hover:opacity-80 transition-colors"
              >
                Remove From Exam
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setTimeout(() => resetModalState(), 300);
          }
        }}
      >
        <DialogTrigger>
          <div
            className="flex items-center justify-center w-full h-[52px] rounded-[10px] bg-accent hover:bg-accent/90 text-white text-[15px] font-semibold transition-colors shadow-xs cursor-pointer my-2"
            onClick={() => {
              resetModalState();
              setIsOpen(true);
            }}
          >
            Add Question
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-3xl w-[95vw] p-0 rounded-[16px] bg-card overflow-hidden flex flex-col gap-0 [&>button]:hidden">
          <div key={editingQuestion?.id ?? "new"} className="max-h-[85vh] overflow-y-auto custom-scrollbar p-6 sm:p-7">
            {/* Top Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full pb-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px] rounded-full border border-border flex items-center justify-center text-[12.5px] font-semibold text-muted-foreground bg-muted/20">
                  {modalQuestionNumber}
                </div>
                <span className="text-[16px] font-bold text-foreground tracking-tight">
                  Question {modalQuestionNumber}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-semibold text-foreground tracking-tight">
                    Score:
                  </span>
                  <Input
                    ref={scoreInputRef}
                    type="number"
                    defaultValue={editingQuestion?.points ?? 1}
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
            <RichEditor
              ref={questionEditorRef}
              minHeight="110px"
              defaultValue={editingQuestion?.questionText || ""}
            />

            {/* Options List */}
            <div className="flex flex-col mt-7 gap-5 ml-6">
              {(questionType === "text" ? options.slice(0, 1) : options).map(
                (opt) => (
                  <div
                    key={opt.id}
                    className="flex flex-col gap-3 animate-in fade-in duration-300"
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
                              defaultChecked={correctAnswersRef.current.has(
                                opt.id,
                              )}
                              onChange={(e) =>
                                handleCorrectAnswerChange(
                                  opt.id,
                                  e.target.checked,
                                )
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
                        disabled={
                          questionType !== "text" && options.length <= 2
                        }
                        className="text-muted-foreground hover:text-destructive disabled:opacity-50 disabled:hover:text-muted-foreground transition-colors px-1"
                      >
                        <Trash2 className="h-[18px] w-[18px]" />
                      </button>
                    </div>

                    <RichEditor
                      ref={(el) => setOptionRef(opt.id, el)}
                      minHeight="70px"
                      defaultValue={
                        editingQuestion
                          ? questionType === "text"
                            ? editingQuestion.textAnswer || ""
                            : editingQuestion.options.find(
                                (o) => o.label === opt.label,
                              )?.text || ""
                          : ""
                      }
                    />
                  </div>
                ),
              )}
            </div>

            {/* Add Option Trigger */}
            {questionType !== "text" && (
              <div className="mt-6 px-1 pb-2 ml-6">
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="flex items-center gap-2 text-accent text-[13.5px] font-semibold hover:opacity-80 transition-colors"
                >
                  <Plus className="h-4 w-4 stroke-[2.5]" /> Another options
                </button>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-between items-center mt-8 pt-5 border-t border-border">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-border text-foreground hover:bg-muted/50 font-semibold px-8 h-[46px] rounded-[10px] text-[14px]"
              >
                Cancel
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleSave}
                  className="border-accent text-accent hover:bg-accent/5 font-semibold px-8 h-[46px] rounded-[10px] text-[14px]"
                >
                  Save
                </Button>
                <Button
                  onClick={handleSaveAndAddMore}
                  className="bg-accent text-white hover:bg-accent/90 font-semibold px-8 h-[46px] rounded-[10px] text-[14px] shadow-xs"
                >
                  Save & Add More
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
