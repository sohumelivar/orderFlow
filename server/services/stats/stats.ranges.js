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
}

export function getLastWeekRange() {
    const now = new Date();
    const end = new Date(now);
    const start = new Date(now);

    start.setUTCDate(start.getUTCDate() - 7);

    return { start, end };
}