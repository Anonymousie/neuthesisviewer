import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, FileType, BookOpen, Tag, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { uploadPDF, insertThesisMetadata, supabase } from "@/lib/supabase";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  author: z.string().min(2, { message: "Author name is required" }),
  abstract: z
    .string()
    .min(10, { message: "Abstract must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Please enter a valid year (YYYY)" }),
  keywords: z.string(),
  file: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Please upload a PDF file",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ThesisUploaderProps {
  onUploadSuccess?: () => void;
  categories?: { id: string; name: string }[];
}

const ThesisUploader = ({
  onUploadSuccess = () => {},
  categories = [
    { id: "1", name: "Computer Science" },
    { id: "2", name: "Engineering" },
    { id: "3", name: "Business" },
    { id: "4", name: "Arts" },
    { id: "5", name: "Medicine" },
  ],
}: ThesisUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      abstract: "",
      category: "",
      year: new Date().getFullYear().toString(),
      keywords: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      form.setValue("file", files as unknown as FileList);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsUploading(true);
    try {
      // Check if Supabase is properly configured
      if (
        !import.meta.env.VITE_SUPABASE_URL ||
        !import.meta.env.VITE_SUPABASE_ANON_KEY
      ) {
        throw new Error(
          "Supabase is not configured. Please set the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
        );
      }

      // Get the file from the form data
      const fileList = data.file as unknown as FileList;
      const file = fileList[0];

      // Generate a unique file name
      const uniqueFileName = `${Date.now()}_${file.name}`;

      // Upload the PDF to Supabase storage
      const filePath = await uploadPDF(file, uniqueFileName);

      // Get the public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from("theses")
        .getPublicUrl(`pdfs/${uniqueFileName}`);

      const fileUrl = publicUrlData?.publicUrl || filePath;
      console.log("Uploaded file URL:", fileUrl);

      // Insert the thesis metadata into the database
      await insertThesisMetadata({
        title: data.title,
        author: data.author,
        abstract: data.abstract,
        category_id: data.category,
        year: data.year,
        keywords: data.keywords,
        file_path: fileUrl, // Use the public URL instead of just the path
        uploaded_by: "current_user_id", // Replace with actual user ID when authentication is implemented
      });

      toast({
        title: "Upload Successful",
        description: "Your thesis has been uploaded successfully.",
      });

      onUploadSuccess();
      form.reset();
      setFileName("");
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload Failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <Card className="border-pink-200 bg-white">
        <CardHeader className="bg-pink-50 rounded-t-xl">
          <CardTitle className="text-2xl font-bold text-pink-700 flex items-center gap-2">
            <Upload className="h-6 w-6" />
            Upload New Thesis
          </CardTitle>
          <CardDescription className="text-pink-600">
            Add a new thesis document to the NEU Thesis Repository
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-pink-700 font-medium flex items-center gap-1">
                        <BookOpen className="h-4 w-4" /> Thesis Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the thesis title"
                          className="border-pink-200 focus-visible:ring-pink-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-pink-700 font-medium">
                        Author Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the author's name"
                          className="border-pink-200 focus-visible:ring-pink-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-pink-700 font-medium flex items-center gap-1">
                        <Tag className="h-4 w-4" /> Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-pink-200 focus-visible:ring-pink-400">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-pink-700 font-medium">
                        Publication Year
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="YYYY"
                          className="border-pink-200 focus-visible:ring-pink-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="abstract"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-pink-700 font-medium flex items-center gap-1">
                      <Info className="h-4 w-4" /> Abstract
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the thesis abstract"
                        className="min-h-[120px] border-pink-200 focus-visible:ring-pink-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-pink-700 font-medium">
                      Keywords
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter keywords separated by commas"
                        className="border-pink-200 focus-visible:ring-pink-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-pink-500 text-xs">
                      Add relevant keywords to help users find this thesis
                      (e.g., machine learning, neural networks)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-pink-700 font-medium">
                      Thesis PDF
                    </FormLabel>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-pink-300 bg-pink-50 hover:bg-pink-100 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileType className="w-10 h-10 mb-3 text-pink-500" />
                          {fileName ? (
                            <p className="mb-2 text-sm text-pink-700">
                              <span className="font-semibold">{fileName}</span>
                            </p>
                          ) : (
                            <>
                              <p className="mb-2 text-sm text-pink-700">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-pink-500">
                                PDF only (MAX. 20MB)
                              </p>
                            </>
                          )}
                        </div>
                        <Input
                          id="dropzone-file"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-end px-0 pt-4">
                <Button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Upload Thesis"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThesisUploader;
