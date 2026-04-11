import React from "react";
import Link from "next/link";
import { Clock, FileText, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MockTest } from "@/lib/mock-tests";

interface CandidateTestCardProps {
  test: MockTest;
}

export const CandidateTestCard = React.memo(function CandidateTestCard({
  test,
}: CandidateTestCardProps) {
  const duration = test.duration || "30 min";
  const questionsCount = test.questions || 20;
  const negativeMarking = test.negativeMarking || "-0.25/wrong";

  return (
    <div className="bg-card border border-border/80 rounded-[12px] p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200">
      <div>
        <h3 className="text-[16px] font-bold text-foreground leading-tight tracking-tight pr-4">
          {test.title}
        </h3>

        <div className="flex items-center gap-4 sm:gap-6 mt-5 flex-wrap">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-[15px] h-[15px] text-muted-foreground mr-[2px] stroke-2" />
            <span className="text-[13px] text-muted-foreground font-medium">
              Duration:
            </span>
            <span className="text-[13px] font-semibold text-foreground">
              {duration}
            </span>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <FileText className="w-[15px] h-[15px] text-muted-foreground mr-[2px] stroke-2" />
            <span className="text-[13px] text-muted-foreground font-medium">
              Question:
            </span>
            <span className="text-[13px] font-semibold text-foreground">
              {questionsCount}
            </span>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <XCircle className="w-[15px] h-[15px] text-muted-foreground mr-[2px] stroke-2" />
            <span className="text-[13px] text-muted-foreground font-medium">
              Negative Marking:
            </span>
            <span className="text-[13px] font-semibold text-foreground">
              {negativeMarking}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-1">
        <Link
          href={`/candidate-tests/${test.id}`}
          className="block w-full max-w-[120px]"
        >
          <Button
            variant="outline"
            className="h-10 rounded-[10px] w-full border-accent text-accent hover:bg-accent/10 hover:text-accent transition-colors border-[1.5px] font-bold text-[13px] tracking-wide"
          >
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
});
