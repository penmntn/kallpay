<template>
    <div>
        <vs-input
            :id="getFieldID(schema)"
            :class="'w-full'"
            v-model="value"
            v-bind="schema.settings"
            :danger="dangers"
        />
    </div>
</template>

<script>
import abstractField from "../abstractField";
// eslint-disable-next-line no-unused-vars
import { debounce, get as objGet, isFunction, isNumber , isNil} from "lodash";

export default {
    mixins:[abstractField],
    mounted (){
		if(!isNil(this.schema.readonly))
        this.$children[0].$refs.vsinput.readOnly=this.schema.readonly
        if(!isNil(this.schema.required))
		this.$children[0].$refs.vsinput.required=this.schema.required
		if(!isNil(this.schema.disabled))
		this.$children[0].$refs.vsinput.disabled=this.schema.disabled
		if(!isNil(this.schema.autocomplete))
		this.$children[0].$refs.vsinput.autocomplete=this.schema.autocomplete
    }
}

</script>