"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What models does Antimatter IDE support?",
    answer:
      "Antimatter supports any model you can run locally via Ollama or HuggingFace, plus cloud providers like OpenAI, Anthropic, Google Gemini, and DeepSeek. Switch between them instantly from the model selector.",
  },
  {
    question: "Is my code sent to external servers?",
    answer:
      "Only if you choose to use a cloud model. When running local models through Ollama, your code never leaves your machine. You have full control over what data goes where.",
  },
  {
    question: "How is this different from Cursor?",
    answer:
      "Antimatter gives you full model ownership. Run any local model, connect any cloud provider, and switch freely. No vendor lock-in, no forced subscriptions for basic AI features, and your data stays yours.",
  },
  {
    question: "What's included in the Free plan?",
    answer:
      "The full IDE with local model support, Ollama and HuggingFace integration, unlimited local inference, VS Code extension compatibility, and community support. No credit card required.",
  },
  {
    question: "Can I use my existing VS Code extensions?",
    answer:
      "Yes. Antimatter IDE is built on the VS Code foundation, so your existing extensions, themes, keybindings, and settings all work out of the box. Zero migration friction.",
  },
];

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className="rounded-2xl bg-muted/50"
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-medium text-foreground">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="shrink-0"
        >
          <Plus className="h-5 w-5 text-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-muted-foreground">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ(): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="text-4xl text-foreground font-medium tracking-tight">
              Answers to your questions
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <FAQItemComponent
                  key={faq.question}
                  item={faq}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
