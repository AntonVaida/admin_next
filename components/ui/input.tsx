import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, error, ...props }: React.ComponentProps<"input"> & { error?: boolean }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "bg-slate-200 flex h-[32px] md:h-12 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        "file:inline-flex file:h-2 md:file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        error
          ? "border-red-500 ring-red-500/50 ring-[4px]"
          : "border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[4px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "font-helvetica text-[24px]", 
        "max-md:text-[12px] max-md:placeholder:text-[12px]",
        className
      )}
      {...props}
    />
  );
}


export { Input }
