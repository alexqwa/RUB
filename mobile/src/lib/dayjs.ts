import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('pt-br');
dayjs.extend(duration);
dayjs.extend(localizedFormat);

const date = new Date();

export const today = dayjs(date).day();
