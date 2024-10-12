"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  image: z.any(),
  title: z.string().min(1, { message: "タイトルは必須です" }),
  model: z.string().min(1, { message: "モデルは必須です" }),
  tags: z.string(),
  prompt: z.string().min(1, { message: "プロンプトは必須です" }),
  price: z.number().min(0, { message: "価格は0以上である必要があります" }),
  currency: z
    .enum(["yen", "dollar"])
    .refine((value) => ["yen", "dollar"].includes(value), {
      message: "価格単位は 'yen' または 'dollar' である必要があります",
    }),
});

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // ボタンがクリックされたら、ファイル入力をトリガー
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      title: "",
      model: "",
      tags: "",
      prompt: "",
      price: 100,
      currency: "yen",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* 画像ファイルアップロード */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col items-center space-y-2">
                    <Button
                      onClick={handleButtonClick}
                      className="bg-blue-500 text-white font-bold mt-4 py-2 px-4 rounded"
                    >
                      画像を追加
                    </Button>
                    <Input
                      {...field}
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/gif"
                      className="hidden" // ファイル入力は隠す
                    />
                    <p className="text-sm text-gray-500">
                      JPEG / GIF / PNG <br />
                      1枚32MB以内、最大200枚（合計200MB以内まで）アップロードできます
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* タイトル */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="タイトル" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* モデル */}
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="AIモデル名（例：SD1.5）" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* タグ */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="タグ（例：女の子 アナログ）" />
                </FormControl>
                <FormDescription>
                  モデルとプロンプト以外で検索対象としたいキーワード
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* プロンプト */}
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder="プロンプト" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 価格 */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>販売価格</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 価格単位 */}
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>価格単位</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue="yen"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="価格単位" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yen">Yen</SelectItem>
                    <SelectItem value="dollar">Dollar</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 送信ボタン */}
          <div className="flex justify-center w-full">
            <Button type="submit" variant="destructive" className="w-32">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
