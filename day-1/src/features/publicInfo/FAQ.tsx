import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  icon: string;
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    icon: "🗳️",
    title: "General",
    items: [
      {
        id: "general-1",
        question: "What is this online voting platform?",
        answer:
          "This is the official online voting platform by the Election Commission of Nepal, providing a secure and convenient alternative voting method.",
      },
      {
        id: "general-2",
        question: "Is online voting mandatory?",
        answer:
          "No, online voting is optional. Physical voting at designated polling stations remains available for all voters.",
      },
    ],
  },
  {
    icon: "👤",
    title: "Eligibility",
    items: [
      {
        id: "eligibility-1",
        question: "Who can vote online?",
        answer:
          "You must be a registered Nepali voter to participate in online voting.",
      },
      {
        id: "eligibility-2",
        question: "What documents do I need?",
        answer:
          "A valid voter ID and citizenship details are required for verification.",
      },
      {
        id: "eligibility-3",
        question: "Can I vote from overseas?",
        answer:
          "Overseas voting is subject to ECN (Election Commission of Nepal) policy and is currently in pilot phase.",
      },
    ],
  },
  {
    icon: "🔐",
    title: "Verification",
    items: [
      {
        id: "verification-1",
        question: "How do I log in?",
        answer:
          "Log in securely using your voter credentials registered with the Election Commission.",
      },
      {
        id: "verification-2",
        question: "What verification methods are available?",
        answer:
          "Identity verification is performed via OTP (One-Time Password), voter ID, and biometric methods where applicable.",
      },
    ],
  },
  {
    icon: "📝",
    title: "Voting Process",
    items: [
      {
        id: "process-1",
        question: "What are the steps to vote?",
        answer:
          "The process is simple: Log in → Verify identity → Select your candidate → Review your choice → Submit your vote.",
      },
      {
        id: "process-2",
        question: "How long does voting take?",
        answer: "The entire voting process takes only a few minutes.",
      },
      {
        id: "process-3",
        question: "Can I change my vote after submission?",
        answer:
          "No, your vote cannot be changed after submission. Please review carefully before confirming.",
      },
    ],
  },
  {
    icon: "🔒",
    title: "Security & Privacy",
    items: [
      {
        id: "security-1",
        question: "Is my vote secure?",
        answer:
          "Yes, all votes are protected with end-to-end encryption ensuring maximum security.",
      },
      {
        id: "security-2",
        question: "Are votes anonymous?",
        answer:
          "Yes, votes are completely anonymous and confidential. No one can link your identity to your vote choice.",
      },
      {
        id: "security-3",
        question: "How is my privacy protected?",
        answer:
          "There is no connection between voter identity and vote choice. Your privacy is our top priority.",
      },
    ],
  },
  {
    icon: "📶",
    title: "Technical Access",
    items: [
      {
        id: "technical-1",
        question: "What devices can I use?",
        answer:
          "You can vote on mobile phones, tablets, and computers - any internet-enabled device.",
      },
      {
        id: "technical-2",
        question: "Which browsers are supported?",
        answer:
          "The platform supports all major web browsers (Chrome, Firefox, Safari, Edge, etc.).",
      },
      {
        id: "technical-3",
        question: "Do I need high-speed internet?",
        answer:
          "No, the platform is optimized for low internet connectivity, making it accessible to all.",
      },
    ],
  },
  {
    icon: "⚠️",
    title: "Errors & Misuse",
    items: [
      {
        id: "errors-1",
        question: "What if I make a mistake?",
        answer:
          "You have a review option before final submission to verify your choice is correct.",
      },
      {
        id: "errors-2",
        question: "Can someone vote twice?",
        answer:
          "No, duplicate voting is automatically blocked by the system. Each voter can only vote once.",
      },
      {
        id: "errors-3",
        question: "What happens to incomplete votes?",
        answer:
          "Incomplete votes are not counted. You must complete and submit your vote.",
      },
    ],
  },
  {
    icon: "📊",
    title: "Results",
    items: [
      {
        id: "results-1",
        question: "When will results be announced?",
        answer:
          "Results are announced according to the official ECN schedule after the voting period ends.",
      },
      {
        id: "results-2",
        question: "Are online votes included in official results?",
        answer:
          "Yes, all online votes are fully included in the official election count.",
      },
      {
        id: "results-3",
        question: "Is the system transparent?",
        answer:
          "Yes, the system supports auditing and transparency to ensure fair election processes.",
      },
    ],
  },
  {
    icon: "⚖️",
    title: "Legal",
    items: [
      {
        id: "legal-1",
        question: "What laws govern this platform?",
        answer:
          "This platform operates under Nepal's Election Act and official ECN (Election Commission of Nepal) guidelines.",
      },
      {
        id: "legal-2",
        question: "Are online votes legally valid?",
        answer:
          "Yes, votes cast through this platform are legally valid and have the same weight as physical votes.",
      },
    ],
  },
  {
    icon: "🆘",
    title: "Help & Support",
    items: [
      {
        id: "support-1",
        question: "Where can I get help?",
        answer:
          "Contact the ECN helpline or visit your local election office for assistance.",
      },
      {
        id: "support-2",
        question: "What if I encounter technical issues?",
        answer:
          "Our support team is available to help. Use the contact support option for immediate assistance.",
      },
    ],
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between transition-colors"
      >
        <span className="text-left font-medium text-gray-900 dark:text-white">
          {item.question}
        </span>
        {isOpen ? (
          <MdRemove className="text-blue-600 dark:text-blue-400 flex-shrink-0 ml-4" />
        ) : (
          <MdAdd className="text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

interface OpenItems {
  [key: string]: boolean;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<OpenItems>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-50/20 dark:bg-slate-900/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about online voting
          </p>
        </div>

        {/* FAQ Categories */}
        {faqData.map((category) => (
          <div key={category.title} className="mb-12">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{category.icon}</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {category.title}
              </h2>
            </div>

            {/* Category Items */}
            <div className="space-y-2">
              {category.items.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openItems[item.id] || false}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Contact Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Contact the ECN helpline or your local election office for more
            assistance
          </p>
          <a
            href="mailto:support@votingapp.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Get Support
          </a>
        </div>
      </div>
    </div>
  );
}
