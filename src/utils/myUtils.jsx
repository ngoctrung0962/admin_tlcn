import moment from 'moment';
import Swal from 'sweetalert2';

const words = 'abcdefghijklmnopqrstuvwxyz0123456789';

export const generateRandomString = (length) => {
	let result = '';
	for (let i = 0; i < length; i++) {
		result += words.charAt(Math.floor(Math.random() * words.length));
	}
	return result;
};

export const getRandomNumberString = (length) => {
	let result = '';
	for (let i = 0; i < length; i++) {
		result += Math.floor(Math.random() * 10);
	}
	return result;
};

/**
 * @description: format date to format dd / mm / yyyy
 * @param {*} date
 * @returns
 */
export const formatDateDisplay = (date, separator = ' / ') => {
	return date && moment(date).isValid()
		? moment(date).format('DD' + separator + 'MM' + separator + 'YYYY')
		: '';
};

/**
 * @description: format date to format HH:mm:ss
 * @param {*} date
 * @returns
 */
export const formatTimeDisplay = (date, showSeconds = false) => {
	return date && moment(date).isValid()
		? moment(date).format('HH:mm' + (showSeconds ? ':ss' : ''))
		: '';
};

/**
 * @description: format date to format dd / mm / yyyy | HH:mm:ss
 * @param {*} date
 * @returns
 */
export const formatDateTimeDisplay = (
	date,
	separator = ' / ',
	showSeconds = true
) => {
	return date && moment(date).isValid()
		? formatDateDisplay(date, separator) +
				' | ' +
				formatTimeDisplay(date, showSeconds)
		: '';
};

/**
 * @description: format number to currency format
 * @param {*} value
 * @returns
 */
export const formatCurrency = (value, unit = 'VNĐ') => {
	value = formatNumber(value);

	if (unit) value += ' ' + unit;

	return value;
};

export const formatNumber = (value) => {
	if (isNaN(value)) return '';

	// return value = value.toLocaleString('vi-VN');
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * @description: format date to format yyyy-mm-dd
 * @param {*} date
 * @returns date in format yyyy-mm-dd if date is valid else return null
 */
export const formatDateValue = (date) => {
	return date && moment(date).isValid()
		? moment(date).format('YYYY-MM-DD')
		: '';
};

export const currencyToNumber = (value) => {
	return value
		? Number(value.toString().replaceAll('.', '').replaceAll(',', ''))
		: 0;
};

export const getDirectlyLink = (url) => {
	if (url.startsWith('http' || 'https')) {
		return url;
	} else {
		if (url.startsWith('/')) {
			return 'https://api.wlin.com.vn' + url;
		}
		return 'https://api.wlin.com.vn/' + url;
	}
};

export const showConfirmDeleteDialog = (positiveAction) => {
	showConfirmDialog(
		'Bạn có chắc chắn muốn xóa không?',
		'Xóa',
		positiveAction
	);
};

export const showConfirmDialog = (title, confirmButtonText, positiveAction) => {
	Swal.fire({
		title: title,
		showCancelButton: true,
		confirmButtonText: confirmButtonText,
		confirmButtonColor: '#005fb7',
		cancelButtonText: 'Hủy',
		cancelButtonColor: '#d33',
	}).then((result) => {
		if (result.isConfirmed) {
			positiveAction();
		}
	});
};

export const generateRegexTextSearch = (listField, text) => {
	return text === ''
		? ''
		: `"$or":[${listField.map((item) =>
				JSON.stringify({
					[item]: { $regex: text, $options: 'i' },
				})
		  )}]`;
};

export const generateRegexTextSearchFromObject = (object) => {
	const query = [];
	for (const key in object) {
		if (object[key]) {
			if (typeof object[key] === 'object' && moment.isDate(object[key])) {
				const startOfDay = moment(object[key])
					.startOf('day')
					.toISOString();
				const endOfDay = moment(object[key]).endOf('day').toISOString();

				const q = {
					$and: [
						{
							[key]: {
								$gte: startOfDay,
							},
						},
						{
							[key]: {
								$lte: endOfDay,
							},
						},
					],
				};

				query.push(JSON.stringify(q));
			} else {
				const q = { [key]: { $regex: object[key], $options: 'i' } };
				query.push(JSON.stringify(q));
			}
		}
	}
	return query.length ? `"$and":[${query}]` : '';
};

export const showLoadingDelete = () => {
	Swal.fire({
		title: 'Đang xóa',
		text: 'Vui lòng chờ giây lát...',
		icon: 'info',
		allowOutsideClick: false,
		allowEscapeKey: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const showLoadingDialog = (title, text) => {
	Swal.fire({
		title: title,
		text: text,
		icon: 'info',
		allowOutsideClick: false,
		allowEscapeKey: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
};
