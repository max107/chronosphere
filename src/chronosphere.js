function strToDigit(str) {
    const exclude = [
        {regex: /восемнадцать/g, value: 18},
        {regex: /семнадцать/g, value: 17},

        {regex: /десять/g, value: 10},
        {regex: /одиннадцать/g, value: 11},
        {regex: /двенадцать/g, value: 12},
        {regex: /тринадцать/g, value: 13},
        {regex: /четырнадцать/g, value: 14},
        {regex: /пятнадцать/g, value: 15},
        {regex: /шестнадцать/g, value: 16},
        {regex: /девятнадцать/g, value: 19},
    ];
    const pairs = [
        {regex: /двадцать/g, value: 2},
        {regex: /тридцать/g, value: 3},
        {regex: /сорок/g, value: 4},
        {regex: /пятьдесят/g, value: 5}
    ];
    const digits = [
        {regex: / одну/g, value: 1},
        {regex: / две/g, value: 2},
        {regex: / три/g, value: 3},
        {regex: / четыре/g, value: 4},
        {regex: / пять/g, value: 5},
        {regex: / шесть/g, value: 6},
        {regex: / семь/g, value: 7},
        {regex: / восемь/g, value: 8},
        {regex: / девять/g, value: 9},
    ];

    for (let r in exclude) {
        if (str.match(exclude[r].regex)) {
            return exclude[r].value.toString();
        }
    }

    for (let i in pairs) {
        let matches = str.match(pairs[i].regex);
        if (matches) {
            for (let t in digits) {
                if (str.replace(matches[0], '').match(digits[t].regex)) {
                    return [
                        pairs[i].value,
                        digits[t].value
                    ].join('');
                }
            }

            return [pairs[i].value, 0].join('');
        }
    }

    for (let t in digits) {
        if (str.match(digits[t].regex)) {
            return digits[t].value.toString();
        }
    }

    return false;
}

export {
    strToDigit
}

export default class Chronosphere {
    options = {
        mydate: new Date(),
        newdate: new Date()
    };

    /**
     * @param options
     */
    constructor(options = {}) {
        const defaultOptions = {};
        this.options = {...options, ...defaultOptions};
    }

    /**
     * Replace str to digit
     * @param str
     * @returns {*}
     */
    replaceDigits(str) {
        const pairs = {
            "одинадцать": "11",
            "двенадцать": "12",
            "тринадцать": "13",
            "четырнадцать": "14",
            "пятнадцать": "15",
            "пятьдесят": "50",
            "сорок": "40",
            " шестнадцать": " 16",
            " семнадцать": " 17",
            " двадцать": " 20",
            " один": " 1",
            " одну": " 1",
            " два": " 2",
            " две": " 2",
            " тридцать": " 30",
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
        for (let find in pairs) {
            str = str.replace(find, pairs[find]);
        }
        return str;
    }

    /**
     * Month str to digit
     * @param str
     * @returns {*}
     */
    monthToDigit(str) {
        switch (str) {
            case "янв":
                return 1;
            case "фев":
                return 2;
            case "мар":
                return 3;
            case "апр":
                return 4;
            case "мая":
                return 5;
            case "июн":
                return 6;
            case "июл":
                return 7;
            case "авг":
                return 8;
            case "сен":
                return 9;
            case "окт":
                return 10;
            case "ноя":
                return 11;
            case "дек":
                return 12;
            default:
                return false;
        }
    }

    /**
     * Парсер даты (позвонить послезавтра, напомнить в 18, в субботу встреча)
     * @param title
     * @returns {{title: string, date: Date, sms: (string|string)}}
     */
    parse(title) {
        title = this.replaceDigits(title.toLowerCase());
        var answer = "";
        var did = false;
        var mytime = "";
        var mydate = this.options.mydate;
        var newdate = this.options.newdate;
        var d = {};
        d.myhours = 0;
        d.myminutes = 0;
        d.mydays = 0;
        d.mymonth = 0;
        d.myyears = 0;
        d.myweek = 0;
        var shablon = /(\d{1,2}.\d{1,2}.\d{4})/g;
        var matches = title.match(shablon);
        if (matches) {
            shablon = /(\d{1,4})/g;
            var matches2 = matches[0].match(shablon);
            newdate.setDate(matches2[0]);
            newdate.setMonth(matches2[1] - 1);
            newdate.setFullYear(matches2[2]);
            answer = matches2[0] + "." + matches2[1] + "." + matches2[2];
            did = true;
        }
        shablon = /(\d{1,2} янв)|(\d{1,2} фев)|(\d{1,2} мар)|(\d{1,2} апр)|(\d{1,2} мая)|(\d{1,2} май)|(\d{1,2} июн)|(\d{1,2} июл)|(\d{1,2} авг)|(\d{1,2} сен)|(\d{1,2} окт)|(\d{1,2} ноя)|(\d{1,2} дек)/g;
        matches = title.match(shablon);
        if (matches) {
            shablon = /(\d{4})/g;
            matches2 = title.match(shablon); //найти год
            shablon = /(янв)|(фев)|(мар)|(апр)|(мая)|(май)|(июн)|(июл)|(авг)|(сен)|(окт)|(ноя)|(дек)/g;
            var matches3 = title.match(shablon); //найти месяц
            shablon = /(\d{1,2})/g;
            var matches4 = matches[0].match(shablon); //найти дату

            let mymonth = this.monthToDigit(matches3[0]);

            newdate.setDate(matches4[0]);
            newdate.setMonth(mymonth - 1);
            if (matches2) {
                newdate.setFullYear(matches2[0]);
            } else {
                // Проснуться 2 января: обрабатывается текущим годом,
                // хотя следующее 2 января может быть только в следующем году
                if (newdate.getTime() < (new Date).getTime()) {
                    newdate.setFullYear(newdate.getFullYear() + 1);
                }
            }
            answer = matches4[0] + " " + matches3[0];
            did = true;
        }
        shablon = /(вчера)|(позавчера)|(сегодня)|(завтра)|(послезавтра)/g;
        matches = title.match(shablon);

        if (matches) {
            let add_days;
            if (matches[0] == "позавчера") {
                add_days = -2;
            }
            if (matches[0] == "вчера") {
                add_days = -1;
            }
            if (matches[0] == "сегодня") {
                add_days = 0;
            }
            if (matches[0] == "завтра") {
                add_days = +1;
            }
            if (matches[0] == "послезавтра") {
                add_days = +2;
            }
            newdate.setDate(newdate.getDate() + add_days);
            answer = " + " + matches[0];
            did = true;
        }

        matches = title
            .match(/(\d{1,2}ч|\d{1,2} ч)|(в \d{1,2}:\d{1,2})|(в\d{1,2}:\d{1,2})|(\d{2} ми)|(\d{2}ми)|(\d{1,2} \d{2}м)|(в \d{1,2} вечера)|(днем в \d{1,2}:\d{1,2})|(днем в \d{1,2})|(в \d{1,2} дня)|(в \d{1,2} ночи)|(в \d{1,2})|(в\d{1,2})|(\d{1,2}:\d{1,2})/g);
        if (matches) {
            if (matches.length == 1) {
                mytime = matches;
            } else {
                mytime = matches.join(" ");
            }
        }

        // все двух-значные цифры
        var matches2 = title.match(/\d{1,4}/g);
        var plus;
        shablon = /(дней|лет|нед|год|мес|день|дня|час|мин|\d{1,2}м|\d{1,2} м)/g;
        matches = title.match(shablon);

        // если "через 2 часа 30 минут"
        if (((title.indexOf("назад") != -1) || (title.indexOf("через") != -1)) && matches) {
            if (title.indexOf("через") != -1) {
                plus = "+";
            } else {
                plus = "-";
            }

            // если указаны часы и минуты
            if (matches[0] == "час") {
                if (matches2) {
                    answer = plus;

                    if (matches2[0]) {
                        answer += matches2[0] + " час.";
                        d.myhours = plus + matches2[0];
                    }

                    if (matches2[1]) {
                        answer += " " + matches2[1] + " мин.";
                        d.myminutes = plus + matches2[0];
                    }
                    // это не время
                    mytime = "";
                }
            }

            // если указаны только минуты
            if (matches[0] == "мин" || (matches[0][matches[0].length - 1] == "м" && (title.indexOf("мес") == -1))) {
                if (matches2) {
                    answer = plus;
                    if (matches2[0]) {
                        answer += " " + matches2[0] + " minute";
                        d.myminutes = plus + matches2[0];
                    }
                    // это не время
                    mytime = "";
                }
            }

            // если указаны только недели
            if (matches[0] == "нед") {
                if (matches2) {
                    answer = plus;
                    if (matches2[0]) {
                        answer += "" + matches2[0] + " нед.";
                        d.myweek = plus + matches2[0];
                    }
                }
                if (title.indexOf("через нед") != -1) {
                    answer = "+ 1 нед.";
                    d.myweek = plus + 1
                }
            }

            // если указаны только месяцы
            if (title.indexOf("месяц") != -1) {
                if (matches2) {
                    answer = plus;
                    if (matches2[0]) {
                        answer += "" + matches2[0] + " мес.";
                        d.mymonth = plus + matches2[0];
                    }
                }

                if (title.indexOf("через мес") != -1) {
                    answer = "+ 1 мес.";
                    d.mymonth = plus + 1;
                }
            }

            // если указаны только месяцы
            if ((title.indexOf(" год") != -1) || (title.indexOf(" лет") != -1)) {
                if (matches2) {
                    answer = plus;
                    if (matches2[0]) {
                        answer += "" + matches2[0] + " год.";
                        d.myyears = plus + matches2[0];
                    }
                }
                if (title.indexOf("через год") != -1) {
                    answer = "+ 1 год.";
                    d.myyears = plus + 1;
                }
            }

            // если указаны только месяцы
            if ((title.indexOf(" день") != -1) || (title.indexOf(" дня") != -1) || (title.indexOf(" дней") != -1)) {
                if (matches2) {
                    answer = plus;
                    if (matches2[0]) {
                        answer += "" + matches2[0] + " дн.";
                        d.mydays = plus + matches2[0];
                    }
                }
                if (title.indexOf("через год") != -1) {
                    answer = "+ 1 дн.";
                    d.mydays = plus + 1;
                }
            }
        }

        if (mytime != "") {
            ///анализ времени
            matches = mytime
                .toString()
                .match(/(в \d{1,2})|(в\d{1,2})|(\d{1,2}:\d{1,2})/g);

            if (matches) {
                let need_analyse = mytime
                    .toString()
                    .match(/(в \d{1,2} в \d{1,2})|(\d{1,2} \d{1,2}м)|(\d{1,2}ч\d{1,2}м)|(\d{1,2}ч \d{1,2}м)|(\d{1,2}:\d{1,2})/g);

                let matches1 = mytime
                    .toString()
                    .match(/(в \d{1,2}:\d{1,2})|(в\d{1,2}:\d{1,2})/g);

                if (matches1) {
                    need_analyse = false;
                }

                if (!need_analyse) {
                    if (mytime.toString().match(/вечера/g)) {
                        let matches3 = mytime.toString().match(/\d{1,2}/g);
                        mytime = (parseInt(matches3[0]) + 12).toString();
                    } else {
                        mytime = mytime.toString().replace("в ", "").replace("в", "");

                        if (mytime.toString().match(/дня|днем/g)) {
                            let matches3 = mytime.toString().match(/\d{1,2}/g);
                            if (matches3.length > 1) {
                                matches3[0] = parseInt(matches3[0]) + 12;
                                mytime = matches3.join(":");
                            } else {
                                mytime = (parseInt(matches3[0]) + 12).toString();
                            }
                        }
                    }

                    if (!matches1) {
                        mytime += ":00";
                    }
                } else {
                    let matches3 = mytime.toString().match(/\d{1,4}/g); //все двух-значные цифры
                    if (matches3 && matches3.length == 1) {
                        mytime = matches3;
                    } else {
                        mytime = matches3.join(":");
                    }
                }
            }
        }

        let add = "";
        if (mytime != "") {
            add = "[" + mytime + "]";
        }

        if (mytime != "") {
            if (mytime.toString().match(/\d{1,2}:\d{1,2}/g)) {
                let newtime = mytime.toString().split(":");
                mydate.setHours(parseInt(newtime[0]), 10);
                mydate.setMinutes(parseInt(newtime[1], 10));
                mydate.setSeconds(0);
            } else {
                mytime = "";
            }
        }
        if (did) {
            newdate.setHours(mydate.getHours() + parseInt(d.myhours, 10));
            newdate.setMinutes(mydate.getMinutes() + parseInt(d.myminutes, 10));
            newdate.setSeconds(0);
            mydate = newdate;
        } else {
            mydate.setHours(mydate.getHours() + parseInt(d.myhours, 10));
            mydate.setMinutes(mydate.getMinutes() + parseInt(d.myminutes, 10));
            mydate.setSeconds(0);
        }
        mydate.setDate(mydate.getDate() + parseInt(d.mydays, 10) + parseInt(d.myweek * 7, 10));
        mydate.setMonth(mydate.getMonth() + parseInt(d.mymonth, 10));
        mydate.setYear(mydate.getFullYear() + parseInt(d.myyears, 10));
        shablon = /(понед)|(вторн)|(сред)|(четв)|(пятн)|(субб)|(воскр)/g;
        matches = title.match(shablon);
        if (matches) {
            let week = 0;
            if (matches[0] == "понед") week = 1;
            if (matches[0] == "вторн") week = 2;
            if (matches[0] == "сред") week = 3;
            if (matches[0] == "четв") week = 4;
            if (matches[0] == "пятн") week = 5;
            if (matches[0] == "субб") week = 6;
            if (matches[0] == "воскр") week = 7;
            if (week != 0) {
                mydate = this.nextWeekDay(mydate, week);
                answer = matches[0];
            }
        }

        let remind = null;

        if ((answer == "") && (mytime == "")) {
            mydate = "";
        }

        if (title.toLowerCase().indexOf("смс") != -1 || title.toLowerCase().indexOf("sms") != -1 || title.toLowerCase().indexOf("напомни") != -1) {
            var remind_time_default = localStorage.getItem("remind_time");
            let remind_time = remind_time_default ? remind_time_default : 15;
            add += " | Напомнить за " + remind_time + " м";
            remind = remind_time + " м";
        }
        return {
            // title: answer + " " + add,
            // title: null,
            date: mydate,
            // remind: null
        };
    }

    /**
     * Поиск следующего дня недели
     * @param date
     * @param day
     * @returns {*}
     */
    nextWeekDay(date, day) {
        day = (Math.abs(+day || 0) % 7) - date.getDay();
        if (day < 0) {
            day += 7;
        }
        if (day) {
            date.setDate(date.getDate() + day);
        }
        return date;
    }
}
