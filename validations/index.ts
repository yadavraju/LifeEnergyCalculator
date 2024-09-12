import {FieldValidation} from "@/types";
import {isNumber} from "@/utils";

const FIELD_VALIDATIONS: FieldValidation = {
    loanAmount: [
        {test: (value) => !!value, message: "Total salary is required"},
        {
            test: (value) => isNumber(value),
            message: "Total salary must be a numeric value",
        },
        {
            test: (value) => value > 0,
            message: "Total salary must be greater than 0",
        },
    ],
    interestRate: [
        {test: (value) => !!value, message: "Work hour is required"},
        {
            test: (value) => isNumber(value),
            message: "Work hour must be a numeric value",
        },
        {
            test: (value) => value > 0 && value <= 24,
            message: "Work hour must be greater than 0 and less than 24 hours",
        },
    ],
    loanTenure: [
        {test: (value) => !!value, message: "Spend Amount is required"},
        {
            test: (value) => isNumber(value),
            message: "Amount must be a numeric value",
        },
        {
            test: (value) => value > 0,
            message: "Amount must be greater than 0",
        },
    ],
};

export {FIELD_VALIDATIONS};
