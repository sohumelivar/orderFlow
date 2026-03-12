export function getLastMonthRange() {
    const now = new Date();

    const start = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth() - 1,
        1
    ));

    const end = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        1
    ));

    return { start, end };
};

export function getLastWeekRange() {
    const now = new Date();
    const end = new Date(now);
    const start = new Date(now);

    start.setUTCDate(start.getUTCDate() - 7);

    return { start, end };
};

export function buildCustomMonthRange(month, year) {
    const monthNum = Number(month);
    const yearNum = Number(year);
    const yearNow = new Date().getFullYear();
    const monthNow = new Date().getMonth() + 1;

    if (monthNum < 1 || monthNum > 12) {
        throw new Error('Invalid month');
    }

    if (yearNum < 2020 || yearNum > yearNow) {
        throw new Error('Invalid year');
    }

    if (yearNum > yearNow || (yearNum === yearNow && monthNum > monthNow)) {
        throw new Error('Month cannot be in the future');
    }

    const start = new Date(Date.UTC(yearNum, monthNum - 1, 1));
    const end = new Date(Date.UTC(yearNum, monthNum, 1));

    return { start, end };
};
