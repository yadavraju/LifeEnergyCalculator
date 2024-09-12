"use client";

import {ChangeEvent} from "react";

import {useRecoilState, useResetRecoilState} from "recoil";

import {
    BottomGradient,
    EMI,
    Layout,
    LoanRepaymentScheduleTable,
    PaymentBreakUp,
    TextField,
} from "@/components";

import {CURRENCY_SYMBOL} from "@/constants";
import {calculateEmiOutcome, validateForm} from "@/utils";

import stateAtom from "@/atoms/stateAtom";

export default function Home() {
    const [state, setState] = useRecoilState(stateAtom);
    const resetState = useResetRecoilState(stateAtom);

    const {loanAmount, interestRate, loanTenure, prepayments, errors} = state;

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState({...state, [name]: value});
    };

    const onCalculate = () => {
        const errors = validateForm(state);

        if (Object.keys(errors).length) {
            setState({...state, errors});
            return;
        }

        setState({
            ...state,
            outcome: calculateEmiOutcome(
                Number(loanAmount),
                Number(interestRate),
                Number(loanTenure),
                prepayments
            ),
            errors: {},
        });
    };

    const resetStatus =
        loanAmount !== 0 || interestRate !== 0 || loanTenure !== 0;

    return (
        <Layout>
            <main>
                <div className="relative px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-4 sm:py-8 lg:py-12">
                        <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Life Energy Calculator
                        </h1>
                        <p className="text-center mt-6 text-lg leading-8 text-gray-600">
                            Life Energy Calculator involves calculating your Real Hourly Wage (RHW) by factoring
                            in your income, work hours, taxes, and work-related expenses. This calculator will help you
                            understand how much of your life energy (time) you are trading for money you spend.
                        </p>
                        <div className="py-6 px-6 sm:py-12 lg:px-8">
                            <form
                                action="#"
                                method="post"
                                className="mx-auto max-w-xl"
                                autoComplete="off"
                            >
                                <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                    <TextField
                                        name="loanAmount"
                                        label="Enter your yearly salary after tax"
                                        placeholder="50,00,000"
                                        unit=""
                                        value={loanAmount}
                                        error={errors?.loanAmount}
                                        onChange={onInputChange}
                                    />
                                    <TextField
                                        name="interestRate"
                                        label="Enter average weekly working hours?"
                                        placeholder="40"
                                        unit="%"
                                        value={interestRate}
                                        error={errors?.interestRate}
                                        onChange={onInputChange}
                                    />
                                    <TextField
                                        name="loanTenure"
                                        label="Amount you going to spend"
                                        placeholder="2000"
                                        unit="Yr"
                                        value={loanTenure}
                                        error={errors?.loanTenure}
                                        onChange={onInputChange}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={onCalculate}
                                        className="btn btn-primary"
                                    >
                                        Calculate
                                    </button>

                                    <button
                                        type="button"
                                        onClick={resetState}
                                        className="btn btn-secondary"
                                        disabled={!resetStatus}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                        <h1 className="text-center mt-6 text-2xl leading-8 text-gray-600">
                            To spend {loanTenure} money you would need to work
                        </h1>
                    </div>
                    <EMI/>
                    <PaymentBreakUp/>
                    {/*<LoanRepaymentScheduleTable onCalculate={onCalculate} />*/}
                    <BottomGradient/>
                </div>
            </main>
        </Layout>
    );
}
