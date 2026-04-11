import React from "react";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

export interface TimeInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  hasError?: boolean;
}

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          type="time"
          ref={ref}
          className={`h-[46px] rounded-[8px] border-[1.5px] text-[14px] text-foreground placeholder:text-muted-foreground pr-10 w-full relative z-10 bg-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 ${
            hasError ? "border-destructive" : "border-border"
          } ${className || ""}`}
          {...props}
        />
        <Clock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground stroke-[2px] pointer-events-none z-0" />
      </div>
    );
  }
);

TimeInput.displayName = "TimeInput";
