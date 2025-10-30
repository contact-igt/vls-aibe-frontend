
import React from "react";
import styles from './styles.module.css'
import Title from "@/common/Title";
import { SessionImages } from "@/common/SessionImage";

export const TrainingSession = ({trainingsession_constant}) => {
    return(
        <div className={styles.trainingWrapper}>
            <Title title="Glimpses of" highlight="Our Extensive Training" />
            <div className={styles.trainingInner}>
                <SessionImages Training={trainingsession_constant} />
            </div>
        </div>
    )
}