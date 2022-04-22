export const truncate = (num: number | string, idx = 2) =>
	+num.toString().slice(0, num.toString().indexOf('.') + (idx + 1));

export const calculateTimestampOfToday = () => {
	const d = new Date();
	d.setHours(0, 0, 0, 0);
	return d.getTime();
};

export const calculateTimestampOfYesterday = () => {
	const d = new Date();
	d.setDate(d.getDate() - 1);
	d.setHours(0, 0, 0, 0);
	return d.getTime();
};

export const calculateTimestampOfThisMonth = () => {
	const d = new Date();
	d.setDate(0);
	d.setHours(0, 0, 0, 0);
	return d.getTime();
};

export const calculateTimestampOfThisYear = () => {
	const d = new Date();
	d.setFullYear(d.getFullYear(), 0, 1);
	d.setHours(0, 0, 0, 0);
	return d.getTime();
};

export const timestampsCalculation = new Date();
export const todayTimestamp = calculateTimestampOfToday();
export const yesterdayTimestamp = calculateTimestampOfYesterday();
export const thisMonthTimestamp = calculateTimestampOfThisMonth();
export const thisYearTimestamp = calculateTimestampOfThisYear();
