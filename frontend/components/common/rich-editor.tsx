"use client";

import React from "react";
import { ChevronDown, Undo2, Redo2, List } from "lucide-react";

export const RichEditor = React.forwardRef<
  HTMLDivElement,
  { minHeight?: string; defaultValue?: string }
>(({ minHeight = "120px", defaultValue = "" }, ref) => {
  const execCommand = (
    command: string,
    value: string | undefined = undefined,
  ) => {
    document.execCommand(command, false, value);
  };

  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

  React.useEffect(() => {
    if (innerRef.current && innerRef.current.innerHTML !== defaultValue) {
      innerRef.current.innerHTML = defaultValue;
    }
  }, [defaultValue]);

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
        ref={innerRef}
        contentEditable
        suppressContentEditableWarning
        className="p-4 bg-card focus-within:ring-0 focus-visible:outline-none custom-scrollbar"
        style={{ minHeight }}
      />
    </div>
  );
});

RichEditor.displayName = "RichEditor";
