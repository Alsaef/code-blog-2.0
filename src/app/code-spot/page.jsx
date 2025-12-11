import CodeSageAISection from "@/components/CodeSageAISection";

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