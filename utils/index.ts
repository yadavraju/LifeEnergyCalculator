import {
  Errors,
  InitialState,
  initialState,
  Prepayments,
  Schedule,
} from "@/types";
import { FIELD_VALIDATIONS } from "@/validations";

function toNumber(value: any) {
  const number = parseFloat(value.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(number)) {
    return 0;
  }
  return number;
}

function toRoundNumber(value: number) {
  return Math.round(value);
}

function toCurrency(value: number | undefined): string {
  if (!value || value <= 0) return "-";

  const formattedValue = Math.round(Number(value) * 100) / 100;

  return formattedValue.toString()
}

function calculateEmiOutcome(
  loanAmount: number,
  interestRate: number,
  loanTenure: number,
  prepayments: Prepayments
) {
  //Total Hours=40 hours/week×50 weeks/year=2,000 hours/year
  const totalWorkHourInYear = interestRate*260 // on average people works for 260 days in year
  const realHourlyWage = loanAmount/totalWorkHourInYear;
  const timeToEarnInHour = loanTenure/realHourlyWage;
  const timeToEarnInDays =  timeToEarnInHour/interestRate // interestRate total hour you are working every day
  const timeToEarnInMonths = timeToEarnInDays/22 //Assuming an average of 22 workdays per month:
  const timeToEarnInYears = timeToEarnInMonths/12

  return {
    emi : timeToEarnInHour,
    totalInterestPayable: timeToEarnInDays,
    schedule: [],
    totalPayment: timeToEarnInMonths,
    principalAmount: timeToEarnInYears,
  };
}

function isNumber(value: any) {
  return !isNaN(Number(value));
}

function validateField(
  state: InitialState,
  fieldName: keyof Errors
): string | undefined {
  const fieldValidationRules = FIELD_VALIDATIONS[fieldName];
  if (!fieldValidationRules) {
    return undefined;
  }

  const fieldValue = state[fieldName];
  const failedValidationRule = fieldValidationRules.find(
    (rule) => !rule.test(fieldValue)
  );

  if (failedValidationRule) {
    return failedValidationRule.message;
  }

  return undefined;
}

function validateForm(state: typeof initialState) {
  const errors: Errors = {};

  for (const fieldName of Object.keys(FIELD_VALIDATIONS) as Array<
    keyof Errors
  >) {
    const errorMessage = validateField(state, fieldName);
    if (errorMessage) {
      errors[fieldName] = errorMessage;
    }
  }

  return errors;
}

const formatter = (value: any) => toCurrency(value);

const pieFormatter = ({ percent }: any) => `${(percent * 100).toFixed(0)}%`;

export {
  toCurrency,
  calculateEmiOutcome,
  toNumber,
  toRoundNumber,
  isNumber,
  formatter,
  pieFormatter,
  validateForm,
};
