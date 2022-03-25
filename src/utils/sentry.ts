import { addBreadcrumb, Severity } from '@sentry/react-native';

const addInfoBreadcrumb = (message: any) =>
	addBreadcrumb({
		level: Severity.Info,
		message
	});

const addDataBreadcrumb = (message: any, data: any) =>
	addBreadcrumb({
		data,
		level: Severity.Info,
		message
	});

const addNavBreadcrumb = (prevRoute: any, nextRoute: any, data: any) =>
	addBreadcrumb({
		data,
		level: Severity.Info,
		message: `From ${prevRoute} to ${nextRoute}`
	});

export default {
	addDataBreadcrumb,
	addInfoBreadcrumb,
	addNavBreadcrumb
};
