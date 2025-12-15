import CodeSageAISection from "@/components/CodeSageAISection";
export const metadata = {
  title: 'Code Spot | Programming PDF Summarizer - Code Blog AI',
  description: 'Code Spot: আপনার প্রোগ্রামিং PDF গুলি আপলোড করুন এবং Google Gemini AI দ্বারা চালিত তাত্ক্ষণিক, সুসংগঠিত সারাংশ ও মূল প্রশ্নোত্তর পান। Code Blog AI এর বিশেষ টুল।',
  keywords: ['Code Spot', 'PDF summarizer', 'programming PDF summary', 'AI summary', 'Google Gemini', 'Code Blog AI tool', 'technical documentation summary'],
  openGraph: {
    title: 'Code Spot | Programming PDF Summarizer - Code Blog AI',
    description: 'Google Gemini AI দ্বারা চালিত Code Spot, যেকোনো প্রোগ্রামিং PDF থেকে দ্রুত সারাংশ ও মূল প্রশ্নোত্তর তৈরি করে। কোড শেখার কাজকে সহজ করুন।',
     url: "https://code-blog-2-0.vercel.app/code-spot",
    images: [
      {
        url: "https://code-blog-2-0.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Code Blog AI",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Spot | Programming PDF Summarizer - Code Blog AI',
    description: 'প্রোগ্রামিং PDF এর জন্য AI-চালিত সারাংশ টুল Code Spot। Google Gemini ব্যবহার করে তাত্ক্ষণিক উত্তর পান।',
    images: ["https://code-blog-2-0.vercel.app/logo.png"],
  },
}
const SummaryGenerator = () => {
    return (
        <div className="min-h-screen bg-base-100 p-4 sm:p-8 mt-20">
            <div className="max-w-3xl mx-auto py-12">

                <header className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-primary mb-2">
                      Code Spot
                    </h1>
                    <p className="text-base-content/70 text-sm">
                        Get structured summaries for your programming PDFs 
                    </p>
                </header>

               <CodeSageAISection></CodeSageAISection>
            </div>
        </div>
    );
};

export default SummaryGenerator;