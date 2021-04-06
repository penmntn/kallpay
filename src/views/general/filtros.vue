<template>
    <div class="w-full pt-6 px-3"> 
        <div class="mb-3">
            <span class="text-xl font-bold text-primary "> Filtros </span>
        </div>
        <div class="mb-2">
            <div> 
                <span class=" text-sm"> Residencia  </span>
            </div>
            <component :is="'menuS'" :attribute="'Direccion.Pais'" :settings ="{ autocomplete : true }" />
        </div>
        <div  class="mb-2">
            <div> 
                <span class=" text-sm"> Habilidad  </span>
            </div>
            <component :is="'menuS'" :attribute="'RequisitosTrabajo.Habilidades.Habilidad'" :settings ="{ autocomplete : true  }" />
        </div>
        <div  class="mb-2">
            <div> 
                <span class=" text-sm"> Area de Especializacion  </span>
            </div>
            <component :is="'menuS'" :attribute="'Area'" :settings ="{ autocomplete : true }" />
        </div>
        <div  class="mb-2">
            <div> 
                <span class=" text-sm"> Empresa  </span>
            </div>
            <component :is="'menuS'" :attribute="'empresa.NombreEmpresa'" :settings ="{ autocomplete : true }" />
        </div>
        <div  class="mb-2">
            <div> 
                <span class=" text-sm"> Jerarquia del Empleo  </span>
            </div>
            <component :is="'menuS'" :attribute="'Jerarquia'" :settings ="{ autocomplete : true }" />
        </div>
        <div  class="mb-2">
            <div> 
                <span class=" text-sm"> Tipo de Empleo  </span>
            </div>
            <component :is="'menuS'" :attribute="'TipoEmpleo'" :settings ="{ autocomplete : true }" />
        </div>
        <div  class="mb-2 px-3">
            <div> 
                <span class=" text-sm font-bold"> Sueldo </span>
            </div>
            <ais-range-input attribute="salario">
                <div slot-scope="{ currentRefinement, range, refine }">
                    <vs-slider 
                        class="algolia-salario-slider"
                        text-fixed="S/"
                        :min="range.min "
                        :max="range.max "
                        :value="toValue( currentRefinement, range)"
                        @input="input(refine,$event[0], $event[1])" />
                </div>
            </ais-range-input>
        </div>
        <div  class="mb-2 px-3">
            <div> 
                <span class=" text-sm font-bold"> Numero de vacantes </span>
            </div>
            <ais-range-input attribute="NumeroVacantes">
                <div slot-scope="{ currentRefinement, range, refine }">
                    <vs-slider 
                        class="algolia-salario-slider"
                        text-fixed="#"
                        :min="range.min "
                        :max="range.max "
                        :value="toValue( currentRefinement, range)"
                        @input="input(refine,$event[0], $event[1])" />
                </div>
            </ais-range-input>
        </div>
        
    </div>
</template>

<script>
import {AisRangeInput} from 'vue-instantsearch'
import {debounce} from "lodash"
import menuS from './components/menu.vue'
export default {
    data(){
        return{
            min_range : null,
            max_range : null, 
        }
    },
    components: {
        menuS,    
        AisRangeInput    
    },
    computed: {
        toValue () {
        return (value, range) => [
            value.min !== null ? value.min : range.min,
            value.max !== null ? value.max : range.max
        ]
        },
    },
    methods:{
        input : debounce(function(refine, val1 , val2 ){
            console.log({min: val1, max: val2})
            refine({min: val1, max: val2})
        }, 1000)
    }
}
</script>

<style lang="scss" scoped>
  .algolia-salario-slider {
    min-width: unset;
  }
</style>