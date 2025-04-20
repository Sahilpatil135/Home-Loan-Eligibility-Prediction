import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Faqs = () => {
    return (
        <div>
            <h1 className="mt-16 text-3xl text-center">Home Loan FAQs</h1>
            <Accordion type="single" collapsible className="w-full mt-10 rounded-xl overflow-hidden border border-[#2d2f3e] shadow-lg bg-[#0F101A]">
                <AccordionItem value="item-1" className="border-b border-[#2d2f3e]">
                    <AccordionTrigger className="px-6 py-4 text-left text-white font-semibold cursor-pointer hover:bg-[#1a1c2b] transition-colors data-[state=open]:text-blue-300">
                        What is Home Loan Eligibility?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-sm text-gray-300 bg-[#13141e]">
                        Home loan eligibility is defined as a set of criteria based on which a financial institution assesses your creditworthiness to avail and repay a home loan. This includes age, income, credit score, obligations, etc.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b border-[#2d2f3e]">
                    <AccordionTrigger className="px-6 py-4 text-left text-white font-semibold cursor-pointer hover:bg-[#1a1c2b] transition-colors data-[state=open]:text-blue-300">
                        How is Home Loan eligibility calculated?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-sm text-gray-300 bg-[#13141e]">
                        Housing loan eligibility is primarily dependent on the income and repayment capacity of the individual(s).There are other factors that determine the eligibility of home loans such as age, financial position, credit history, credit score, other financial obligations etc.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b border-[#2d2f3e]">
                    <AccordionTrigger className="px-6 py-4 text-left text-white font-semibold cursor-pointer hover:bg-[#1a1c2b] transition-colors data-[state=open]:text-blue-300">
                        How to enhance Home Loan eligibility?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-sm text-gray-300 bg-[#13141e]">
                        The eligibility for Home Loan can be enhanced by:
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Adding an earning family member as co-applicant.</li>
                            <li>Availing a structured repayment plan.</li>
                            <li>Ensuring a steady income flow, regular savings, and investments.</li>
                            <li>Furnishing details of your regular additional income sources.</li>
                            <li>Keeping a record of your variable salary components.</li>
                            <li>Taking actions to rectify errors (if any) in your credit score.</li>
                            <li>Repaying ongoing loans and short-term debts.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b border-[#2d2f3e]">
                    <AccordionTrigger className="px-6 py-4 text-left text-white font-semibold cursor-pointer hover:bg-[#1a1c2b] transition-colors data-[state=open]:text-blue-300">
                        What Factors determine your home loan eligibility?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-sm text-gray-300 bg-[#13141e]">
                        When you apply for a home loan, your eligibility is primarily dependent on your income and repayment capacity.
                        There are also some other factors that determine your home loan eligibility:
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Your age</li>
                            <li>Financial position</li>
                            <li>Credit history</li>
                            <li>Credit score</li>
                            <li>Other financial liabilities</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-b border-[#2d2f3e]">
                    <AccordionTrigger className="px-6 py-4 text-left text-white font-semibold cursor-pointer hover:bg-[#1a1c2b] transition-colors data-[state=open]:text-blue-300">
                        How does your home loan repayment work?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-sm text-gray-300 bg-[#13141e]">
                        A home loan is usually repaid through Equated Monthly Instalments (EMI).The EMI comprises of the principal and interest components which are structured in a way that in the initial years of your loan, the interest component is much larger than the principal component, while towards the latter half of the loan, the principal component is much larger.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Faqs