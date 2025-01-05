import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localizedFormat)
dayjs.locale("pt-br")

const date = new Date()
const week_day = dayjs(date).format("dddd")

export const today = dayjs(date).day()
export const weekday = week_day.charAt(0).toUpperCase() + week_day.slice(1)
export const date_month = dayjs(date).format("DD/MM/YYYY")
