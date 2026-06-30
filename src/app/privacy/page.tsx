"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <PageWrapper className="flex flex-col min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 w-full flex-1">
        <Link href="/">
          <Button variant="ghost" className="mb-8 pl-0">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-neutral-500 mb-12">Last Updated: October 2023</p>

        <div className="prose prose-invert max-w-none text-neutral-300">
          <p className="mb-6">
            At Notiq AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h3>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you create an account, upload documents, paste notes, or communicate with us. This may include your name, email address, and the contents of the educational materials you submit for processing.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-4">2. How We Use Your Information</h3>
          <p className="mb-4">
            We use the information we collect to operate, maintain, and improve our services. Specifically, the text and notes you upload are securely transmitted to our AI partners (such as OpenAI or Groq) solely for the purpose of generating your customized study materials. We do not use your personal notes to train public AI models.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-4">3. Data Security</h3>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-4">4. Third-Party Services</h3>
          <p className="mb-4">
            We may use third-party service providers (such as hosting providers and AI API providers) to help us operate our business. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-4">5. Contact Us</h3>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: <a href="mailto:wayden2025@gmail.com" className="text-brand-cyan hover:underline">wayden2025@gmail.com</a>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
