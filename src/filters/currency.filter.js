export default function currencyFilter(value) {
    if (value >= 1) {
        return value.toFixed(6)
    } else {
        return value
    }
}