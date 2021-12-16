export const Logger = ({
	info: console.log,
	warn: console.warn,
	error: (e: Error) => {
		// tracker.publish(e.message)
		console.error(e);
	},
});
