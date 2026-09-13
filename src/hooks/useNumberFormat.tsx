// File header: `useNumberFormat` is a small utility hook that provides
// locale-aware number formatting used in KPI and numeric displays.
import { currencyFormat, getCurrencySymbol, numberFormat } from 'lib/utils';

const useNumberFormat = () => {
  return {
    currencyFormat: (amount: number, options?: Intl.NumberFormatOptions) =>
      currencyFormat(amount, 'en-US', {
        currency: 'USD',
        ...options,
      }),
    numberFormat: (number: number, options?: Intl.NumberFormatOptions) =>
      numberFormat(number, 'en-US', options),
    currencySymbol: getCurrencySymbol('USD', 'en-US'),
  };
};

export default useNumberFormat;
