// Получаем текущую дату в формате DD-MM-YYYY
export function getDateNow(): string {
    let date = new Date();
    let day: string = String(date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
    let month: string = String((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
    return day + "-" + month + "-" + date.getFullYear()
}
