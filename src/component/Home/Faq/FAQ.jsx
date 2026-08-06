"use client";
import { useState } from "react";
import styles from "./FAQ.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import Title from "@/common/Title";
import { programConfig as defaultProgramConfig } from "@/constant/Home";
import { isRegistrationOpen } from "@/utils/programStatus";

const FAQ = ({ faqs, config = defaultProgramConfig }) => {
  const [openQuestion, setOpenQuestion] = useState(0);
  const isRegOpen = isRegistrationOpen(config);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? -1 : index);
  };

  const displayFaqs = (faqs || []).map((faq) => {
    if (!isRegOpen) {
      const qLower = (faq.question || "").toLowerCase();
      if (
        qLower.includes("fee") ||
        qLower.includes("price") ||
        qLower.includes("cost")
      ) {
        return {
          ...faq,
          answer:
            "The fee structure for the upcoming batch will be announced alongside the batch dates. Join the waitlist to receive special early-bird notifications.",
        };
      }
      if (
        qLower.includes("date") ||
        qLower.includes("schedule") ||
        qLower.includes("when")
      ) {
        return {
          ...faq,
          answer:
            "Dates for the upcoming batch are currently being finalized. Join the waitlist to receive prompt updates via Email and WhatsApp as soon as the schedule is announced.",
        };
      }
    }
    return faq;
  });

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <Title
          title={"Frequently"}
          highlight={"Asked Questions"}
          subTitle={
            " Get answers to common questions about our services and approach"
          }
        />

        <div className={styles.faqContainer}>
          {displayFaqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.questionButton}
                onClick={() => toggleQuestion(index)}
                aria-expanded={openQuestion === index}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.chevron}>
                  {openQuestion === index ? (
                    <ChevronUp size={20} color="#FF6500" />
                  ) : (
                    <ChevronDown size={20} color="#FF6500" />
                  )}
                </span>
              </button>

              <div
                className={`${styles.answerContainer} ${
                  openQuestion === index ? styles.open : ""
                }`}
              >
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
