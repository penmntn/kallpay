import { defaults, isNil, isNumber, isInteger, isString, isArray, isFunction, isFinite } from "lodash";

let resources = {
	fieldIsRequired: "Este campo es requerido!",
	invalidFormat: "Formato Invalido!",

	numberTooSmall: "El número es demasiado pequeño! Minimo: {0}",
	numberTooBig: "El número es demasiado Grande! Maximo: {0}",
	invalidNumber: "Numero invalido",
	invalidInteger: "la entrada no es un numero",

	textTooSmall: "¡La longitud del texto es demasiado pequeña! Actual: {0}, Minimo: {1}",
	textTooBig: "¡La longitud del texto es demasiado grande! Actual: {0}, Maximo: {1}",
	thisNotText: "Esto no es un texto!",

	thisNotArray: "Esto no es un Lista!",

	selectMinItems: "Selecciona Minimo {0} items!",
	selectMaxItems: "Selecciona maximo {0} items!",

	invalidDate: "fecha invalida!",
	dateIsEarly:"La fecha es demasiado pronto! Actual: {0}, Minimo: {1}",
	dateIsLate: "La fecha es demasiado tarde! Actual: {0}, maximo: {1}",

	invalidEmail: "Correo no valido!",
	invalidURL: "URL no valida!",

	invalidCard: "formato de tarjeta invalida!",
	invalidCardNumber: "numero de tarjeta invalida!",

	invalidTextContainNumber: "Texto inválido! No puede contener números ni caracteres especiales",
	invalidTextContainSpec: "Texto inválido! No puede contener caracteres especiales"
};

function checkEmpty(value, required, messages = resources) {
	if (isNil(value) || value === "") {
		if (required) {
			return [msg(messages.fieldIsRequired)];
		} else {
			return [];
		}
	}
	return null;
}

function msg(text) {
	if (text != null && arguments.length > 1) {
		for (let i = 1; i < arguments.length; i++) {
			text = text.replace("{" + (i - 1) + "}", arguments[i]);
		}
	}

	return text;
}

const validators = {
	resources,

	required(value, field, model, messages = resources) {
		return checkEmpty(value, field.required, messages);
	},

	number(value, field, model, messages = resources) {
		let res = checkEmpty(value, field.required, messages);
		if (res != null) return res;

		let err = [];
		if (isFinite(value)) {
			if (!isNil(field.min) && value < field.min) {
				err.push(msg(messages.numberTooSmall, field.min));
			}

			if (!isNil(field.max) && value > field.max) {
				err.push(msg(messages.numberTooBig, field.max));
			}
		} else {
			err.push(msg(messages.invalidNumber));
		}

		return err;
	},

	integer(value, field, model, messages = resources) {
		let res = checkEmpty(value, field.required, messages);
		if (res != null) return res;
		let errs = validators.number(value, field, model, messages);

		if (!isInteger(value)) {
			errs.push(msg(messages.invalidInteger));
		}

		return errs;
	},

	double(value, field, model, messages = resources) {
		let res = checkEmpty(value, field.required, messages);
		if (res != null) return res;

		if (!isNumber(value) || isNaN(value)) {
			return [msg(messages.invalidNumber)];
		}
	},

	string(value, field, model, messages = resources) {
		let res = checkEmpty(value, field.required, messages);
		if (res != null) return res;

		let err = [];
		if (isString(value)) {
			if (!isNil(field.min) && value.length < field.min) {
				err.push(msg(messages.textTooSmall, value.length, field.min));
			}

			if (!isNil(field.max) && value.length > field.max) {
				err.push(msg(messages.textTooBig, value.length, field.max));
			}
		} else {
			err.push(msg(messages.thisNotText));
		}

		return err;
	},

	array(value, field, model, messages = resources) {
		if (field.required) {
			if (!isArray(value)) {
				return [msg(messages.thisNotArray)];
			}

			if (value.length === 0) {
				return [msg(messages.fieldIsRequired)];
			}
		}

		if (!isNil(value)) {
			if (!isNil(field.min) && value.length < field.min) {
				return [msg(messages.selectMinItems, field.min)];
			}

			if (!isNil(field.max) && value.length > field.max) {
				return [msg(messages.selectMaxItems, field.max)];
			}
		}
	},


	regexp(value, field, model, messages = resources) {
		let res = checkEmpty(value, field.required, messages);
		if (res != null) return res;

		if (!isNil(field.pattern)) {
			let re = new RegExp(field.pattern);
			if (!re.test(value)) {
				return [msg(messages.invalidFormat)];
			}
		}
	},

	email(value, field, model, messages = resources) {
		let res = checkEmpty(value, field.required, messages);
		if (res != null) return res;

		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
		if (!re.test(value)) {
			return [msg(messages.invalidEmail)];
		}
	},

	url(value, field, model, messages = resources) {
		let res = checkEmpty(value, field.required, messages);
		if (res != null) return res;

		let re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g; // eslint-disable-line no-useless-escape
		if (!re.test(value)) {
			return [msg(messages.invalidURL)];
		}
	},

	creditCard(value, field, model, messages = resources) {
		let res = checkEmpty(value, field.required, messages);
		if (res != null) return res;

		/*  From validator.js code
			https://github.com/chriso/validator.js/blob/master/src/lib/isCreditCard.js
		*/
		const creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
		const sanitized = value.replace(/[^0-9]+/g, "");
		if (!creditCard.test(sanitized)) {
			return [msg(messages.invalidCard)];
		}
		let sum = 0;
		let digit;
		let tmpNum;
		let shouldDouble;
		for (let i = sanitized.length - 1; i >= 0; i--) {
			digit = sanitized.substring(i, i + 1);
			tmpNum = parseInt(digit, 10);
			if (shouldDouble) {
				tmpNum *= 2;
				if (tmpNum >= 10) {
					sum += tmpNum % 10 + 1;
				} else {
					sum += tmpNum;
				}
			} else {
				sum += tmpNum;
			}
			shouldDouble = !shouldDouble;
		}

		if (!(sum % 10 === 0 ? sanitized : false)) {
			return [msg(messages.invalidCardNumber)];
		}
	},

	alpha(value, field, model, messages = resources) {
		let res = checkEmpty(value, field.required, messages);
		if (res != null) return res;

		let re = /^[a-zA-Z]*$/;
		if (!re.test(value)) {
			return [msg(messages.invalidTextContainNumber)];
		}
	},

	alphaNumeric(value, field, model, messages = resources) {
		let res = checkEmpty(value, field.required, messages);
		if (res != null) return res;

		let re = /^[a-zA-Z0-9]*$/;
		if (!re.test(value)) {
			return [msg(messages.invalidTextContainSpec)];
		}
	}
};

Object.keys(validators).forEach(name => {
	const fn = validators[name];
	if (isFunction(fn)) {
		fn.locale = customMessages => (value, field, model) => fn(value, field, model, defaults(customMessages, resources));
	}
});

export default validators;
