export function formatNumber(number: number, decimals: number) {
    return number
        ? new Intl.NumberFormat('en-US', {
            style: 'decimal',
            useGrouping: true,
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(number)
        : '0';
}