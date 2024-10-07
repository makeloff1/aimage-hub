"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const SearchForm = () => {
  const inputRef = useRef<HTMLInputElement>(null); //focus周りの挙動を制御するために使用
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );
  useEffect(() => {
    // ここで server side で prefetch したリストをフィルタする
    console.log("inputText: ", inputText);
  }, [inputText]);

  return (
    <div className="flex items-center justify-center w-full">
      <Command
        shouldFilter={false}
        onKeyDown={handleKeyDown}
        value={selected}
        className="overflow-visible"
      >
        <CommandInput
          value={inputText}
          ref={inputRef}
          placeholder="キーワードで検索"
          onValueChange={(text) => {
            setInputText(text);
            // 再編集時には選択済み項目をクリア
            if (selected) {
              setSelected(undefined);
            }
          }}
          onBlur={() => setOpen(false)}
          onFocus={() => {
            setOpen(true);
            if (selected) {
              inputRef.current?.select(); // フォーカス時に選択済み項目がある場合、全選択する
            }
          }}
        />
        <div className="relative mt-2">
          {!selected && open && (
            <CommandList
              className={`absolute left-0 top-0 w-full rounded bg-background shadow-md ${
                inputText ? "border border-white" : null
              }`}
            >
              {inputText ? (
                <CommandEmpty className="text-muted-foreground px-4 py-2">
                  ヒットなし
                </CommandEmpty>
              ) : null}
              {searchResults?.map((v) => (
                <CommandItem
                  className="flex items-center gap-2"
                  onSelect={() => {
                    setSelected(v);
                    setInputText(v);
                  }}
                  value={v}
                  key={v}
                >
                  {v}
                  <ExternalLink className="ml-auto h-4 w-4" />
                </CommandItem>
              ))}
            </CommandList>
          )}
        </div>
      </Command>
    </div>
  );
};
