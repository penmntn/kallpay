<template>
    <div>
        <vs-select v-model="value" class="w-full select-large" :id="getFieldID(schema)"  v-bind="schema.settings">
            <div :key="index" v-for="(item,index) in items" >
                <vs-select-group  :title="getGroupName(item)" v-if="item.group">
                    <div v-if="item.ops" >
                        <vs-select-item :key="index" :value="getItemValue(i)" :text="getItemName(i)" v-for="(i,index) in item.ops"  />
                    </div>
                </vs-select-group>
                <div v-if="!item.group">
                    <vs-select-item :key="index" :value="getItemValue(item)" :text="getItemName(item)" class="w-full"  />
                </div>
            </div>
        </vs-select>
    </div>
</template>

<script>

import { isObject, isNil, find } from "lodash";
import abstractField from "../abstractField";
// eslint-disable-next-line no-unused-vars
import { debounce, get as objGet, isFunction, isNumber } from "lodash";
import vSelect from 'vue-select'

export default {
    components :{
        vSelect
    },
    mixins:[abstractField],
	computed: {
		selectOptions() {
			return this.schema.selectOptions || {};
		},

		items() {
			let values = this.schema.values;
			if (typeof values == "function") {
				return this.groupValues(values.apply(this, [this.model, this.schema]));
			} else return this.groupValues(values);
		}
	},
	methods: {
		formatValueToField(value) {
			if (isNil(value)) {
				return null;
			}
			return value;
		},

		groupValues(values) {
			let array = [];
			let arrayElement = {};

			values.forEach(item => {
				arrayElement = null;

				if (item.group && isObject(item)) {
					// There is in a group.

					// Find element with this group.
					arrayElement = find(array, i => i.group === item.group);

					if (arrayElement) {
						// There is such a group.

						arrayElement.ops.push({
							value: item.id,
							name: item.name
						});
					} else {
						// There is not such a group.

						// Initialising.
						arrayElement = {
							group: "",
							ops: []
						};

						// Set group.
						arrayElement.group = item.group;

						// Set Group element.
						arrayElement.ops.push({
							value: item.value,
							name: item.name
						});

						// Add array.
						array.push(arrayElement);
					}
				} else {
					// There is not in a group.
					array.push(item);
				}
			});

			// With Groups.
			return array;
		},

		getGroupName(item) {
			if (item && item.group) {
				return item.group;
			}

			throw "Group name is missing! https://icebob.gitbooks.io/vueformgenerator/content/fields/select.html#select-field-with-object-items";
		},

		getItemValue(item) {
			if (isObject(item)) {
				if (typeof this.schema["selectOptions"] !== "undefined" && typeof this.schema["selectOptions"]["value"] !== "undefined") {
					return item[this.schema.selectOptions.value];
				} else {
					// Use 'value' instead of 'value' cause of backward compatibility
					if (typeof item["value"] !== "undefined") {
						return item.value;
					} else {
						throw "`value` is not defined. If you want to use another key name, add a `value` property under `selectOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/select.html#select-field-with-object-items";
					}
				}
			} else {
				return item;
			}
		},

		getItemName(item) {
			if (isObject(item)) {
				if (typeof this.schema["selectOptions"] !== "undefined" && typeof this.schema["selectOptions"]["name"] !== "undefined") {
					return item[this.schema.selectOptions.name];
				} else {
					if (typeof item["name"] !== "undefined") {
						return item.name;
					} else {
						throw "`name` is not defined. If you want to use another key name, add a `name` property under `selectOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/select.html#select-field-with-object-items";
					}
				}
			} else {
				return item;
			}
		}
	}
};
</script>