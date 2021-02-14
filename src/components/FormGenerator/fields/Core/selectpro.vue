<template>
    <div>
        <v-select label="name" :filterable="config.filterable"  :taggable="config.tags"  :options="optiones" @search="onSearch">
            <template slot="no-options">
                escribe para buscar
            </template>
            <template slot="option" slot-scope="option">
            <div class="d-center">
                {{ option.name}}
                </div>
            </template>
            <template slot="selected-option" slot-scope="option">
            <div class="selected d-center">
                {{ option.name }}
            </div>
            </template>
        </v-select>
    </div>
</template>

<script>
import { debounce } from 'lodash' 
import vSelect from 'vue-select'
import abstractField from "../abstractField";

export default {
    components: {
        vSelect
    },
    mixins: [abstractField],
    data(){
        return {
            optiones:[]
        }
    },
    computed:{
        config(){
            return this.schema.settings
        }
    },
    methods:{
        onSearch(search, loading) {
            if(search.length) {
                loading(true);
                this.search(loading, search, this);
            }
        },
        search: debounce((loading, search, vm) => {
            vm.optiones = []
            this.$htpp( '/graphql', vm.schema.config.query).
            then(res => {
                for(let i=0 ; i < res.data.data[this.config.model.name].length ; i++){
                    if(this.config.model.id){
                        this.vm.optiones.push({
                            id: res.data.data[this.config.model.name][i]['id'],
                            name : res.data.data[this.config.model.name][i][this.config.model.label]
                        })
                    }
                    else{
                        this.vm.optiones.push({
                            id: res.data.data[this.config.model.name][i][this.config.model.label],
                            name : res.data.data[this.config.model.name][i][this.config.model.label]
                        })
                    }
                }
                loading(false);
            });
            }, 350)

    }



}
</script>