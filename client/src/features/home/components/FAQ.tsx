import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How can I sell my artwork on RungLey?",
    answer: "Simply create an artist profile, upload your artwork, and set your pricing. Clients can place bids or purchase directly.",
    value: "item-1",
  },
  {
    question: "Is RungLey free for artists?",
    answer: "Yes, creating an account is free! We charge a small commission on completed sales to support the platform.",
    value: "item-2",
  },
  {
    question: "What types of art can I list?",
    answer: "RungLey is designed for traditional artists, including paintings, calligraphy, murals, and sculptures.",
    value: "item-3",
  },
  {
    question: "How do I receive payments?",
    answer: "Payments are securely processed via multiple methods, including direct bank transfers and digital wallets.",
    value: "item-4",
  },
  {
    question: "Can clients request custom artwork?",
    answer: "Yes! Clients can request custom commissions by posting project requirements for artists to bid on.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-[#F35E21] to-[#FFD700] text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-[#F35E21] transition-all border-[#F35E21] hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
