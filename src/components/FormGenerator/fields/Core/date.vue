<template>
    <div>
        <flat-pickr
            :id="getFieldID(schema)"
            :class="'w-full'"
            v-model="value"
            v-bind="schema.settings"
        />
    </div>
</template>

<script>
import abstractField from "../abstractField";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
// eslint-disable-next-line no-unused-vars
import { debounce, get as objGet, isFunction, isNumber } from "lodash";

export default {
    components :{
        flatPickr
    },
    mixins:[abstractField],
}
</script>