<template>
    <div class="vue-form-generator" v-if="schema!=null">
		<div :class="[field.style, ['inline-block']]" v-for="(field,key) in fieldss"  :key="key">
			<div class="mx-2 px-2">
				<slot :name="key">
					<form-group v-if="fieldVisible(field)" :vfg="vfg" :key="key" :field="field"  :errores="errores" :model="model" :options="options" @validated="onFieldValidated" @model-updated="onModelUpdated">
					</form-group>
				</slot>
			</div>
		</div>

		<div v-for="(group, keys) in groups" :key="keys">
				<div v-if="group.legend" class="mb-4 mx-2">
					<template>
						<vs-icon :icon="group.legend.icon" size="small" icon-pack="feather" color="primary"></vs-icon>
					</template>
					<span class="text-2xl text-primary px-2 font-semibold" >{{group.legend.label}}</span>
				</div>

				<div :class="[field.style , ['inline-block']]" v-for="(field,key) in group.fields"  :key="key">
					<div class="mx-2 px-2">
						<slot :name="key">
							<form-group v-if="fieldVisible(field)" :vfg="vfg" :key="key" :field="field"  :errores="errores" :model="model" :options="options" @validated="onFieldValidated" @model-updated="onModelUpdated">
							</form-group>
						</slot>
					</div>
				</div>
		</div>

    </div>
</template>
<script>

import { get as objGet, forEach, isFunction, isNil, isArray } from "lodash";
import formMixin from "./formMixin.js";
import formGroup from "./FormGroup";

export default {
	name: "formGen",
	components: { formGroup},
	mixins: [formMixin],
	props: {
		schema: Object,

		model: Object,

		typeGroup:  "",

		options: {
			type: Object,
			default() {
				return {
					validateAfterLoad: false,
					validateAfterChanged: false,
					fieldIdPrefix: "",
					validateAsync: false,
					validationErrorClass: "error",
					validationSuccessClass: ""
				};
			}
		},

		multiple: {
			type: Boolean,
			default: false
		},

		isNewModel: {
			type: Boolean,
			default: false
		},

		tag: {
			type: String,
			default: "fieldset",
			validator: function(value) {
				return value.length > 0;
			}
		},

		grid: Array
	},

	data() {
		return {
			vfg: this,
			errores: []
		};
	},

	computed: {
		fieldss() {
			let res = [];
			if (this.schema && this.schema.fields) {
				forEach(this.schema.fields, field => {
					if (!this.multiple || field.multi !== true) res.push(field);
				});
			}

			return res;
		},
		groups() {
			let res = [];
			if (this.schema && this.schema.groups) {
				forEach(this.schema.groups.slice(0), group => {
					res.push(group);
				});
			}

			return res;
		}
	},

	watch: {
		// new model loaded
		model: function(newModel, oldModel) {
			if (oldModel === newModel)
				// model property changed, skip
				return;

			if (newModel != null) {
				this.$nextTick(() => {
					// Model changed!
					if (this.options.validateAfterLoad === true && this.isNewModel !== true) {
						this.validate();
					} else {
						this.clearValidationErrors();
					}
				});
			}
		}
	},

	mounted() {
		this.$nextTick(() => {
			if (this.model) {
				if (this.options.validateAfterLoad === true && this.isNewModel !== true) {
					this.validate();
				} else {
					this.clearValidationErrors();
				}
			}
		});
	},

	methods: {
		// Get visible prop of field
		fieldVisible(field) {
			if (isFunction(field.visible)) return field.visible.call(this, this.model, field, this);

			if (isNil(field.visible)) return true;

			return field.visible;
		},

		// Child field executed validation
		onFieldValidated(res, errors, field) {
			// Remove old errors for this field
			this.errores = this.errores.filter(e => e.field !== field.schema);

			if (!res && errors && errors.length > 0) {
				// Add errors with this field
				forEach(errors, err => {
					this.errores.push({
						field: field.schema,
						error: err
					});
				});
			}

			let isValid = this.errores.length === 0;
			this.$emit("validated", isValid, this.errores, this);
		},

		onModelUpdated(newVal, schema) {
			this.$emit("model-updated", newVal, schema);
		},

		// Validating the model properties
		validate(isAsync = null) {
			if (isAsync === null) {
				isAsync = objGet(this.options, "validateAsync", false);
			}

			this.clearValidationErrors();

			let fields = [];
			let results = [];

			forEach(this.$children, child => {
				if (isFunction(child.validate)) {
					fields.push(child.$refs.child); // keep track of validated children
					results.push(child.validate(true));
				}
			});

			let handleErrors = errors => {
				let formErrors = [];
				forEach(errors, (err, i) => {
					if (isArray(err) && err.length > 0) {
						forEach(err, error => {
							formErrors.push({
								field: fields[i].schema,
								error: error
							});
						});
					}
				});
				this.errores = formErrors;
				let isValid = formErrors.length === 0;
				this.$emit("validated", isValid, formErrors, this);
				return isAsync ? formErrors : isValid;
			};

			if (!isAsync) {
				return handleErrors(results);
			}

			return Promise.all(results).then(handleErrors);
		},

		// Clear validation errors
		clearValidationErrors() {
			this.errores.splice(0);
			forEach(this.$children, child => {
				try {
					child.clearValidationErrors();
				} catch (error) {
					console.log("no se pudo")
				}
			});
		},
	}
};

</script>

<style lang="scss">

.vue-form-generator {
	* {
		box-sizing: border-box;
	}

	.form-control {
		// Default Bootstrap .form-control style
		display: block;
		&:not([class*=" col-"]) {
			width: 100%;
		}
		padding: 6px 12px;
		font-size: 14px;
		line-height: 1.42857143;
		color: #555;
		background-color: #fff;
		background-image: none;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
		transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
	} // .form-control

	span.help {
		margin-left: 0.3em;
		position: relative;

		.icon {
			display: inline-block;
			width: 16px;
			height: 14px;
			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAA+UlEQVQ4ja3TS0oDQRAG4C8+lq7ceICICoLGK7iXuNBbeAMJuPVOIm7cqmDiIncIggg+cMZFaqCnZyYKWtB0df31V1VXdfNH6S2wD9CP8xT3KH8T9BiTcE7XBMOfyBcogvCFO9ziLWwFRosyV+QxthNsA9dJkEYlvazsQdi3sBv6Ol6TBLX+HWT3fcQZ3vGM5fBLk+ynAU41m1biCXvhs4OPBDuBpa6GxF0P8YAj3GA1d1qJfdoS4DOIcIm1DK9x8iaWeDF/SP3QU6zRROpjLDFLsFlibx1jJaMkSIGrWKntvItcyTBKzCcybsvc9ZmYz3kz9Ooz/b98A8yvW13B3ch6AAAAAElFTkSuQmCC");
			background-repeat: no-repeat;
			background-position: center center;
		}
	}
	.field-wrap {
		display: flex;

		.buttons {
			white-space: nowrap;
			margin-left: 4px;
		}

		button,
		input[type="submit"] {

			&:not(:last-child) {
				margin-right: 4px;
			}

			&:hover {
				color: #333;
				background-color: #e6e6e6;
				border-color: #adadad;
			}

			&:active {
				color: #333;
				background-color: #d4d4d4;
				border-color: #8c8c8c;
				outline: 0;
				box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
			}

			&:disabled {
				opacity: 0.6;
				cursor: not-allowed;
			}
		} // button, input[submit]
	} // .field-wrap

	.hint {
		font-style: italic;
		font-size: 0.8em;
	} // .hint
} // fieldset
</style>
