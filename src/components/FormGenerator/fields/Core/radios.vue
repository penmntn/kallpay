<template >
	<div class="w-full">
		<ul class="demo-alignment  w-full" >
			<li v-for="(item, key) in items" :key="key" :class="schema.settings.style">
                <vs-radio v-model="value"
                    :id="getFieldID(schema, true)"
                    :vs-name="getInputName(item)"
                    :vs-value="getItemValue(item)"
                    v-bind="{}"
                    >{{getInputName(item)}}
                </vs-radio>
			</li>
		</ul>
	</div>
</template>

<script>
import { isObject} from "lodash";
import abstractField from "../abstractField";
import { slugify } from "../../utils/schema";

export default {
	mixins: [abstractField],

	data() {
		return {
			datos : [],
			comboExpanded: false
		};
	},

	computed: {
		items() {
			let values = this.schema.values;
			if (typeof values == "function") {
				return values.apply(this, [this.model, this.schema]);
			} else return values;
		},

		selectedCount() {
			if (this.value) return this.value.length;

			return 0;
		}
	},

	watch :{
		datos(){
			this.value = this.datos
		}
	},
	methods: {
		getInputName(item) {
			if (this.schema && this.schema.inputName && this.schema.inputName.length > 0) {
				return slugify(this.schema.inputName + "_" + this.getItemValue(item));
			}
			return slugify(this.getItemValue(item));
		},

		getItemValue(item) {
			if (isObject(item)) {
				if (typeof this.schema["checklistOptions"] !== "undefined" && typeof this.schema["checklistOptions"]["value"] !== "undefined") {
					return item[this.schema.checklistOptions.value];
				} else {
					if (typeof item["value"] !== "undefined") {
						return item.value;
					} else {
						throw "`value` is not defined. If you want to use another key name, add a `value` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values";
					}
				}
			} else {
				return item;
			}
		},
		getItemName(item) {
			if (isObject(item)) {
				if (typeof this.schema["checklistOptions"] !== "undefined" && typeof this.schema["checklistOptions"]["name"] !== "undefined") {
					return item[this.schema.checklistOptions.name];
				} else {
					if (typeof item["name"] !== "undefined") {
						return item.name;
					} else {
						throw "`name` is not defined. If you want to use another key name, add a `name` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values";
					}
				}
			} else {
				return item;
			}
		},
	}
};
</script>

0