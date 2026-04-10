"use client";

import { Button } from "@/components/ui/button";

export function QuestionSetsForm() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      <Button className="w-full h-[52px] rounded-[10px] bg-accent hover:bg-accent/90 text-white text-[15px] font-semibold transition-colors">
        Add Question
      </Button>

      {/* Future complex UI elements will go here */}
    </div>
  );
}
