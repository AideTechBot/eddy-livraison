/**
 * Returns today's opening hours
 * 
 * @param {number[][]} hours
 * @returns {{open: number, close: number}}
 */
function getTodaysHours(hours) {
	const today = new Date();
	const dayIndex = today.getDay()

	return {
		open: hours[dayIndex][0],
		close: hours[dayIndex][1],
	}
}

/**
 * Returns the current time in a format comparable to the data in data.json
 * 
 * @returns {number} Current time
 */
function getNow() {
  const today = new Date();
  return parseFloat(`${today.getHours()}.${today.getMinutes()}`);
}

/**
 * @param {number[][]} hours
 * @returns {boolean} The open state of the store
 */
export function isOpen(hours) {
  const now = getNow();
	const todaysHours = getTodaysHours(hours);

  return now > todaysHours.open && now < todaysHours.close
}
