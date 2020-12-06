<template>
    <div>
        <vs-textarea
            class="mb-0 w-full"
            :id="getFieldID(schema)"
            v-model="value"
            v-bind="schema.settings"
        />
    </div>
</template>

<script>
import abstractField from "../abstractField";
// eslint-disable-next-line no-unused-vars
import { debounce, get as objGet, isFunction, isNumber } from "lodash";

export default {
    mixins:[abstractField],
}
</script>