import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Initialize the Supabase client
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

if (
  !import.meta.env.VITE_SUPABASE_URL ||
  !import.meta.env.VITE_SUPABASE_ANON_KEY
) {
  console.warn(
    "Using placeholder Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Function to upload a PDF file to Supabase storage
export async function uploadPDF(file: File, fileName: string) {
  try {
    // First check if the bucket exists, if not create it
    const { data: buckets } = await supabase.storage.listBuckets();
    const thesesBucket = buckets?.find((bucket) => bucket.name === "theses");

    if (!thesesBucket) {
      // Create the bucket if it doesn't exist
      const { error: createBucketError } = await supabase.storage.createBucket(
        "theses",
        {
          public: true, // Set to true to make files publicly accessible
        },
      );

      if (createBucketError) {
        console.error("Error creating bucket:", createBucketError);
        throw createBucketError;
      }
    } else {
      // Update bucket to be public if it exists but isn't public
      const { error: updateBucketError } = await supabase.storage.updateBucket(
        "theses",
        {
          public: true,
        },
      );

      if (updateBucketError) {
        console.error("Error updating bucket:", updateBucketError);
      }
    }

    // Create the pdfs folder if it doesn't exist
    try {
      await supabase.storage.from("theses").list("pdfs");
    } catch (e) {
      // If folder doesn't exist, create an empty file to initialize it
      const emptyBlob = new Blob([""], { type: "text/plain" });
      await supabase.storage
        .from("theses")
        .upload("pdfs/.folder", emptyBlob, { upsert: true });
    }

    // Now upload the file
    const { data, error } = await supabase.storage
      .from("theses")
      .upload(`pdfs/${fileName}`, file, {
        cacheControl: "3600",
        upsert: true, // Allow overwriting files with the same name
        contentType: "application/pdf", // Explicitly set content type
      });

    if (error) throw error;
    return data.path;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw error;
  }
}

// Function to insert thesis metadata into the database
export async function insertThesisMetadata(metadata: ThesisMetadata) {
  try {
    const { data, error } = await supabase
      .from("theses")
      .insert([metadata])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error inserting thesis metadata:", error);
    throw error;
  }
}

// Type for thesis metadata
export interface ThesisMetadata {
  title: string;
  author: string;
  abstract: string;
  category_id: string;
  year: string;
  keywords: string;
  file_path: string;
  uploaded_by: string;
}
