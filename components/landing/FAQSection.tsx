"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Heading from "../Heading";

const faqs = [
  {
    question: "How is Travelus different from normal bus booking?",
    answer:
      `Normal booking systems are built for big bus companies — expensive, complex, and unnecessary if you just have one or two vehicles.
      Travelus changes that: with only your phone, you can post a ride, connect with passengers, and earn. 
      Simple, flexible, and made for everyone — not just big bus companies.
      `
  },
  {
    question: "What if a fake driver tries to scam me?",
    answer:
      "Impossible. Since drivers don’t get paid until you confirm you’ve boarded, no one can claim your money without delivering the ride.",
  },
  {
    question: "How is the payment handled?",
    answer:
      "Funds are held securely until the ride is confirmed. Once you verify, the money is instantly transferred to the driver’s registered account."
  },
  {
    question: "When do drivers get paid?",
    answer:
    "Drivers only receive payment after passengers confirm they’ve actually joined the ride. This keeps everything fair and prevents fraud."
  },
  {
    question: "I have a different question",
    answer: "Drop it in the Feedback section below and we’ll get back to you with an answer as soon as possible."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 px-6 bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto">
        <Heading title="Frequently Asked Questions"/>
        <div className="space-y-4 mt-10">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg bg-white/5 backdrop-blur-sm border border-gray-600/10 overflow-hidden"
            >
              <button
                className="w-full rounded-md bg-transparent flex justify-between active:scale-100 items-center p-2 px-3 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-300">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="p-5 pt-0 flex items-center text-gray-500/10 relative">
                  <div className="border-l-4 border-gray-400/20 pl-4 mt-1">
                    <p className="text-gray-500">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
