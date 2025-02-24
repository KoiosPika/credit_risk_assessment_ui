'use server'

import { FormDataType } from "@/components/shared/CreditRiskForm";

export async function getCreditRisk(formData: FormDataType) {
    try {
        const response = await fetch("http://3.139.132.70:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Failed to fetch credit risk prediction");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in getCreditRisk:", error);
        return { error: "Failed to process request" };
    }
}