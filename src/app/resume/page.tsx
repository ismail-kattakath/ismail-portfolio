"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResumeDownloadPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if static PDF exists, otherwise redirect to edit page
    fetch("/resume.pdf", { method: "HEAD" })
      .then((response) => {
        if (response.ok) {
          // PDF exists, trigger download
          const link = document.createElement("a");
          link.href = "/resume.pdf";
          link.download = "Ismail_Kattakath_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // No PDF found, redirect to edit page with print instruction
          router.push("/resume/edit");
        }
      })
      .catch(() => {
        // Error checking, redirect to edit
        router.push("/resume/edit");
      });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Preparing your resume...</h1>
        <p className="text-gray-400">
          If download doesn't start, you'll be redirected to the editor.
        </p>
      </div>
    </div>
  );
}
