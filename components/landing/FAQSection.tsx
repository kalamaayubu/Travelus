"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Heading from "../Heading";

const faqs = [
  {
    question: "What is Travelus?",
    answer:
      "Travelus is a smart, seamless ride-booking platform designed to make intercity travel smooth, affordable, and reliable. Think of it as your trusted travel companion.",
  },
  {
    question: "How is Travelus different from normal bus booking?",
    answer:
      "Unlike traditional booking, Travelus lets you discover routes, book seats instantly, track rides in real-time, and enjoy secure digital payments—all in one app.",
  },
  {
    question: "Can I book for multiple passengers?",
    answer:
      "Yes, you can reserve multiple seats in a single booking. Just choose the number of seats you need before confirming.",
  },
  {
    question: "Is Travelus safe?",
    answer:
      "Absolutely. All drivers and vehicles go through verification checks, and we provide real-time ride tracking plus support channels for your safety.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-bl from-gray-950 to-gray-900 text-white">
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
                  <div className="border-l-4 border-gray-400/20 pl-4 py-1">
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
