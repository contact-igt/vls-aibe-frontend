
import React from "react";
import styles from './styles.module.css'
import Title from "@/common/Title";
import { SessionImages } from "@/common/SessionImage";
import Button from "@/common/Button";

export const TrainingSession = ({trainingsession_constant , handleToggleToForm}) => {
    return(
        <div className={styles.trainingWrapper}>
            <Title title="Glimpses of" highlight="Our Extensive Training" />
            <div className={styles.trainingInner}>
                <SessionImages Training={trainingsession_constant} />
            </div>
        <div className="mt-5 d-flex justify-content-center">
          <Button
            name={"Enroll for ₹99 Only"}
            bg_color={"#b20a0a"}
                 icon={"circle-check"}
            icon_color={"#fff"}
            name_color={"#fff"}
            onClick={handleToggleToForm}
          />
        </div>
        </div>
    )
}