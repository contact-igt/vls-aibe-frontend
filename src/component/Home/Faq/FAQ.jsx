"use client";
import { useState } from "react";
import styles from "./FAQ.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import Title from "@/common/Title";

const FAQ = ({faqs}) => {
  const [openQuestion, setOpenQuestion] = useState(0);



  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? -1 : index);
  };

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
          {faqs.map((faq, index) => (
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
