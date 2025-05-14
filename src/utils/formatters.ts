
/**
 * Format a number as currency
 * @param amount The amount to format
 * @param currency The currency symbol (defaults to ₦)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = '₦') => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  .format(amount)
  .replace('NGN', currency);
};
