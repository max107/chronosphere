import Chronosphere from '../src/chronosphere';

/*
describe('Chronosphere nextWeekDay', () => {
    const chrono = new Chronosphere();

    it('should next Monday', () => {
        const sum = chrono.nextWeekDay(new Date('2017-03-09'), 1);
        expect(sum.getDay()).toBe(1);
    });

    it('should next Tuesday', () => {
        const sum = chrono.nextWeekDay(new Date('2017-03-08'), 2);
        expect(sum.getDay()).toBe(2);
    });

    it('should next Wednesday', () => {
        const sum = chrono.nextWeekDay(new Date('2017-03-08'), 3);
        expect(sum.getDay()).toBe(3);
    });

    it('should next Thursday', () => {
        const sum = chrono.nextWeekDay(new Date('2017-03-08'), 4);
        expect(sum.getDay()).toBe(4);
    });

    it('should next Friday', () => {
        const sum = chrono.nextWeekDay(new Date('2017-03-08'), 5);
        expect(sum.getDay()).toBe(5);
    });

    it('should next Saturday', () => {
        const sum = chrono.nextWeekDay(new Date('2017-03-08'), 6);
        expect(sum.getDay()).toBe(6);
    });

    it('should next Sunday', () => {
        const sum = chrono.nextWeekDay(new Date('2017-03-08'), 0);
        expect(sum.getDay()).toBe(0);
    });
});

describe('Chronosphere replaceDigits', () => {
    const chrono = new Chronosphere();

    const pairs = {
        "одинадцать": "11",
        "двенадцать": "12",
        "тринадцать": "13",
        "четырнадцать": "14",
        "пятнадцать": "15",
        " шестнадцать": " 16",
        " семнадцать": " 17",
        " двадцать": " 20",
        " один": " 1",
        " два": " 2",
        " три": " 3",
        " четыре": " 4",
        " пять": " 5",
        " шесть": " 6",
        " семь": " 7",
        "восемь": "8",
        "девять": "9",
        "десять": "10",
        " ноль": " 0",
    };
    for (let key in pairs) {
        it('should be correct digit: ' + key, () => {
            expect(chrono.replaceDigits(key)).toBe(pairs[key]);
        })
    }
});
*/

describe('Chronosphere parse', () => {
    //noinspection JSNonASCIINames
    const provider = {
        'Напомнить про ДР жены через 10 дней в 11:30': { date: '2017-03-19 11:30:00' },
        'Мыть машину через 2 дня в 11': { date: '2017-03-11 11:00:00' },
        'Поздравить с ДР через год в 12:30': { date: '2018-03-09 12:30:00' },
        'Записаться на пятницу': { date: '2017-03-10 00:00:00' },
        'Проснуться 2 января': { date: '2018-01-02 00:00:00' },
        'Через 50 лет купить котедж': { date: '2067-03-09 00:00:00' },
        'Сегодня в 16 позвонить жене': { date: '2017-03-09 16:00:00' },
        'Через пять дней в 14:00': { date: '2017-03-14 14:00:00' },
        'Поздравить всех с НГ 31 декабря в 23': { date: '2017-12-31 23:00:00' },
        'Получить письмо в 18': { date: '2017-03-09 18:00:00' },
        'Послезавтра в 11 приехать за зарплатой': { date: '2017-03-11 11:00:00' },
        'Сегодня в 21часов 30 минут выключить Дом2': { date: '2017-03-09 21:30:00' },
        'Купить браслет Jawbone Up через 2 дня в 20:00': { date: '2017-03-11 20:00' },
        'Напомнить сделать рефакторинг в субботу': { date: '2017-03-11 00:00:00' },
        'Перезагрузить сервер в воскресение в 2': { date: '2017-03-12 02:00:00' },
        'Перезагрузить сервер в воскресение в 2 дня': { date: '2017-03-12 14:00:00' },
        'Перезагрузить сервер в воскресение ночью в 2': { date: '2017-03-12 02:00:00' },
        'Перезагрузить сервер в воскресение ночью в 2:15': { date: '2017-03-12 02:15:00' },
        'Перезагрузить сервер в воскресение днем в 2': { date: '2017-03-12 14:00:00' },
        'Перезагрузить сервер в воскресение днем в 2:30': { date: '2017-03-12 14:30:00' },
        'в субботу в 7 вечера': { date: '2017-03-11 19:00:00' },
    };

    for (let str in provider) {
        it(str, () => {
            let params = (new Chronosphere({
                date: new Date('2017-03-09 00:00:00')
            })).parse(str);

            expect(params.date.toString())
                .toBe((new Date(provider[str].date)).toString());
        });
    }
});
