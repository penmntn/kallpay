<template>
	<div class="form-group" :class="getFieldRowClasses(field)">
		<label v-if="fieldTypeHasLabel(field)" :for="getFieldID(field)" :class="[field.labelClasses, 'etiqueta', 'inline-flex', getFieldRowClasses(field).featured?'font-semibold':'', getFieldRowClasses(field).disabled?'text-gray-500':'', getFieldRowClasses(field).error ? 'text-danger':'text-gray-900']">
			<label class="text-base">{{field.label}}</label>
			<span v-if='field.help' class="help">
				<vs-tooltip :text="field.help"  :color="getFieldRowClasses(field).error?'danger':'primary'">
				<i class="icon"></i>
				</vs-tooltip>
			</span>
		</label>
		<div class="w-full">
			<component ref="child" :is="getFieldType(field)" :vfg="vfg" :disabled="fieldDisabled(field)" :model="model" :schema="field" :formOptions="options" @model-updated="onModelUpdated" @validated="onFieldValidated" ></component>
			<div v-if="buttonVisibility(field)" class="buttons">
				<button v-for="(btn, index) in field.buttons" @click="buttonClickHandler(btn, field, $event)" :class="btn.classes" :key="index" v-text="btn.label" :type="getButtonType(btn)"></button>
			</div>
		</div>

		<div v-if="field.hint" class="hint" v-html="fieldHint(field)"></div>
		<div v-if="fieldErrors(field).length > 0" class="text-sm text-danger font-thin italic help-block">
			<span v-for="(error, index) in fieldErrors(field)" :key="index" v-html="error"></span>
		</div>
	</div>

</template>
<script>

import { get as objGet, isNil, isFunction } from "lodash";
import { slugifyFormID } from "./utils/schema";
import formMixin from "./formMixin.js";
import fieldInput from './fields/Core/input'
import fieldSelect  from './fields/Core/select'
import fieldChecklist from  './fields/Core/checklist'
import fieldDate from './fields/Core/date'
import fieldTextarea from './fields/Core/textarea'
import fieldRadios from './fields/Core/radios'
import fieldFile from './fields/Core/file'
import fieldQuill from './fields/Core/Quill.vue'
export default {
	name: "form-group",
	components: {
		fieldInput,
		fieldSelect,
		fieldChecklist,
		fieldDate,
		fieldTextarea,
		fieldRadios,
		fieldFile,
		fieldQuill
	},
	mixins: [formMixin],
	props: {
		vfg: {
			type: Object,
			required: true
		},
		model: Object,
		options: {
			type: Object
		},
		field: {
			type: Object,
			required: true
		},
		errores: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	methods: {
		// Should field type have a label?
		fieldTypeHasLabel(field) {
			if (isNil(field.label)) return false;

			let relevantType = "";
			if (field.type === "input") {
				relevantType = field.inputType;
			} else {
				relevantType = field.type;
			}

			switch (relevantType) {
				case "button":
				case "submit":
				case "reset":
					return false;
				default:
					return true;
			}
		},
		getFieldID(schema) {
			const idPrefix = objGet(this.options, "fieldIdPrefix", "");
			return slugifyFormID(schema, idPrefix);
		},
		// Get type of field 'field-xxx'. It'll be the name of HTML element
		getFieldType(fieldSchema) {
			return "field-" + fieldSchema.type;
		},
		// Get type of button, default to 'button'
		getButtonType(btn) {
			return objGet(btn, "type", "button");
		},
		// Child field executed validation
		onFieldValidated(res, errors, field) {
			this.$emit("validated", res, errors, field);
		},
		buttonVisibility(field) {
			return field.buttons && field.buttons.length > 0;
		},
		buttonClickHandler(btn, field, event) {
			return btn.onclick.call(this, this.model, field, event, this);
		},
		// Get current hint.
		fieldHint(field) {
			if (isFunction(field.hint)) return field.hint.call(this, this.model, field, this);

			return field.hint;
		},
		fieldErrors(field) {
			return this.errores.filter((e) => e.field === field).map((item) => item.error);
		},
		onModelUpdated(newVal, schema) {
			this.$emit("model-updated", newVal, schema);
		},
		validate(calledParent) {
			return this.$refs.child.validate(calledParent);
		},
		clearValidationErrors() {
			if (this.$refs.child) {
				return this.$refs.child.clearValidationErrors();
			}
		}
	}
};
</script>
<style lang="scss">
$errorColor: #f00;
$successColor: #329137;

.form-group:not([class*=" col-"]) {
	width: 100%;
}
.form-group {
	display: inline-block;
	vertical-align: top;
	// width: 100%;
	// margin: 0.5rem 0.26rem;
	margin-bottom: 1rem;

	&.required {
		> label:after {
			content: "*";
			font-weight: normal;
			color: Red;
			// position: absolute;
			padding-left: 0.2em;
			font-size: 1em;
		}
	}
}
</style>
