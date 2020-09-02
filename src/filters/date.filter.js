export default function dateFilter(value) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }
    const date = `
        ${Intl.DateTimeFormat('ru-RU').format(new Date(value))} / 
        ${Intl.DateTimeFormat('ru-RU', options).format(new Date(value))}
    `
    return date
}