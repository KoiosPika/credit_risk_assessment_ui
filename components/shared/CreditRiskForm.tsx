'use client'

import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { XIcon } from 'lucide-react'

const CreditRiskForm = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [creditRisk, setCreditRisk] = useState(null);
    const dialogRef = useRef<any>(null)
    const [formData, setFormData] = useState<any>({
        person_age: "",
        person_income: "",
        person_home_ownership: "",
        person_emp_length: "",
        cb_person_cred_hist_length: "",
        cb_person_default_on_file: "",
        loan_intent: "",
        loan_grade: "",
        loan_amnt: "",
        loan_int_rate: "",
        loan_percent_income: ""
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await fetch("http://3.139.132.70:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    loan_percent_income: formData.loan_percent_income / 100
                })
            });

            const data = await response.json();
            setCreditRisk(data.credit_risk);
            setLoading(false);

            if (dialogRef.current) {
                dialogRef.current.showModal();
            }
        } catch (error) {
            alert("An error occurred while submitting the form.");
            setLoading(false)
        }
    };

    const GenerateRandomSequence = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const refreshPage = () => {
        setFormData({
            person_age: "",
            person_income: "",
            person_home_ownership: "",
            person_emp_length: "",
            cb_person_cred_hist_length: "",
            cb_person_default_on_file: "",
            loan_intent: "",
            loan_grade: "",
            loan_amnt: "",
            loan_int_rate: "",
            loan_percent_income: ""
        })
    }

    return (
        <div className='bg-white w-full md:w-2/5 rounded-lg flex flex-col justify-center items-center'>
            <p className='py-3 text-[20px] font-semibold'>Loan Application</p>
            <section className='mr-auto p-5 w-full text-[14px] sm:text-[16px]'>
                <p className='bg-gradient-to-r from-slate-700 to-slate-400 text-white p-2 rounded-md mb-3'>Personal Information</p>
                <div className='w-full flex flex-col justify-between items-center gap-2'>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>How old are you?</p>
                        <Input type='number' name="person_age" value={formData.person_age} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>What is your annual income?</p>
                        <Input type='number' name="person_income" value={formData.person_income} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>What is your current home ownership status?</p>
                        <Select onValueChange={(value) => handleSelectChange("person_home_ownership", value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="OWN">Own</SelectItem>
                                <SelectItem value="RENT">Rent</SelectItem>
                                <SelectItem value="MORTGAGE">Mortgage</SelectItem>
                                <SelectItem value="OTHER">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>
            <section className='mr-auto px-5 pb-5 w-full text-[14px] sm:text-[16px]'>
                <p className='bg-gradient-to-r from-slate-700 to-slate-400 text-white p-2 rounded-md mb-3'>Employment & Credit History</p>
                <div className='w-full flex flex-col justify-between items-center gap-2'>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>How many years have you been employed?</p>
                        <Input type='number' name="person_emp_length" value={formData.person_emp_length} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>How many years have you had a credit history?</p>
                        <Input type='number' name="cb_person_cred_hist_length" value={formData.cb_person_cred_hist_length} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>Have you ever defaulted on a loan before?</p>
                        <Select onValueChange={(value) => handleSelectChange("cb_person_default_on_file", value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Yes/No" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Y">Yes</SelectItem>
                                <SelectItem value="N">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>
            <section className='mr-auto px-5 pb-5 w-full text-[14px] sm:text-[16px]'>
                <p className='bg-gradient-to-r from-slate-700 to-slate-400 text-white p-2 rounded-md mb-3'>Loan Details</p>
                <div className='w-full flex flex-col justify-between items-center gap-2'>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>What is the purpose of this loan?</p>
                        <Select onValueChange={(value) => handleSelectChange("loan_intent", value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Loan Intent" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MEDICAL">Medical</SelectItem>
                                <SelectItem value="EDUCATION">Education</SelectItem>
                                <SelectItem value="DEBTCONSOLIDATION">Debt Consolidation</SelectItem>
                                <SelectItem value="PERSONAL">Personal</SelectItem>
                                <SelectItem value="VENTURE">Venture</SelectItem>
                                <SelectItem value="HOMEIMPROVEMENT">Home Improvement</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>What is your expected loan grade?</p>
                        <Select onValueChange={(value) => handleSelectChange("loan_grade", value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Loan Grade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A">A</SelectItem>
                                <SelectItem value="B">B</SelectItem>
                                <SelectItem value="C">C</SelectItem>
                                <SelectItem value="D">D</SelectItem>
                                <SelectItem value="E">E</SelectItem>
                                <SelectItem value="F">F</SelectItem>
                                <SelectItem value="G">G</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>How much money are you requesting for a loan?</p>
                        <Input type='number' name="loan_amnt" value={formData.loan_amnt} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>What interest rate were you offered?</p>
                        <div className='flex flex-row items-center justify-center gap-1'>
                            <Input type='number' name="loan_int_rate" value={formData.loan_int_rate} onChange={handleChange} />
                            <p className='font-bold text-[18px]'>%</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <p>What percentage of your income will go towards loan repayment?</p>
                        <div className='flex flex-row items-center justify-center gap-1'>
                            <Input type='number' name="loan_percent_income" value={formData.loan_percent_income} onChange={handleChange} />
                            <p className='font-bold text-[18px]'>%</p>
                        </div>
                    </div>
                </div>
            </section>
            <Dialog>
                <DialogTrigger>
                    <div className='my-3 bg-gradient-to-r from-slate-700 to-slate-400 px-3 py-1 rounded-md text-white' onClick={handleSubmit}>{loading ? 'Please Wait...' : 'Submit Application'}</div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Loan Application Status</DialogTitle>
                    </DialogHeader>
                    {(!creditRisk && loading) && <p>Processing your request...</p>}
                    {(creditRisk == 1) &&
                        <div className='flex flex-col justify-center items-center text-[13px] sm:text-[16px] gap-2'>
                            <p>Congratulations! Your loan was approved! 🎉</p>
                            <div className='flex flex-col justify-center items-center'>
                                <p>Your confirmation code is:</p>
                                <p className='font-bold'>{GenerateRandomSequence()}</p>
                            </div>
                        </div>}
                    {(creditRisk == 0) &&
                        <div className='flex flex-col justify-center items-center text-[13px] sm:text-[16px] gap-2'>
                            <p>Sorry! Your loan was not approved! ❌</p>
                            <p>You can always try again later!</p>
                        </div>}
                    <DialogClose className='absolute top-3 right-3' onClick={refreshPage}>
                        <XIcon />
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreditRiskForm