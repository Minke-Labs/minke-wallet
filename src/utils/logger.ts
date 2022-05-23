/* eslint-disable no-console */
import { SENTRY_DSN } from '@env';
import * as Sentry from '@sentry/react-native';
import sentryUtils from './sentry';

const safelyStringifyWithFormat = (data: any) => {
	try {
		const seen: any = [];
		const newData = JSON.stringify(
			data,
			// Required to ignore cyclic structures
			(key, val) => {
				if (val != null && typeof val === 'object') {
					if (seen.indexOf(val) >= 0) {
						return;
					}
					seen.push(val);
				}
				// eslint-disable-next-line consistent-return
				return val;
			},
			2
		);
		return { data: newData };
	} catch (e) {
		Sentry.captureException(e);
		return {};
	}
};

const Logger = {
	initialize() {
		if (__DEV__) return;
		Sentry.init({
			dsn: SENTRY_DSN || process.env.SENTRY_DSN,
			debug: __DEV__
		});
	},
	debug(...args: any[]) {
		if (__DEV__) {
			const date = new Date().toLocaleTimeString();
			Array.prototype.unshift.call(args, `[${date}] ⚡⚡⚡ `);
			console.log(...args);
		}
	},

	error(...args: any[]) {
		if (__DEV__) {
			console.log(...args);
		}
	},

	log(...args: any[]) {
		if (__DEV__) {
			const date = new Date().toLocaleTimeString();
			Array.prototype.unshift.call(args, `[${date}]`);
			console.log(...args);
		}
	},

	sentry(...args: any[]) {
		if (__DEV__) {
			const date = new Date().toLocaleTimeString();
			Array.prototype.unshift.call(args, `[${date}]`);
			console.log(...args);
		}
		if (args.length === 1 && typeof args[0] === 'string') {
			// @ts-expect-error
			sentryUtils.addInfoBreadcrumb.apply(null, args);
		} else {
			const safeData = safelyStringifyWithFormat(args[1]);
			sentryUtils.addDataBreadcrumb(args[0], safeData);
		}
	},
	warn(...args: any[]) {
		if (__DEV__) {
			console.warn(...args);
		}
	}
};

export default Logger;
