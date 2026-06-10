import { faqs as globalFaqs } from "../../config/constants";
import { FAQItem } from "../ui";
import type { FAQ } from "../../types";

interface Props {
  faqs?: FAQ[];
}

const FAQAccordion = ({ faqs = globalFaqs }: Props) => (
  <div>
    {faqs.map((faq, index) => (
      <FAQItem key={faq.question} question={faq.question} defaultOpen={index === 0}>
        {faq.answer}
      </FAQItem>
    ))}
  </div>
);

export default FAQAccordion;
