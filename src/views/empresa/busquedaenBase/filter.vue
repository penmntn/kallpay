<template>
    <div class="w-full pt-4 px-3"> 
        <div >
            <span class="text-xl font-bold text-primary "> Filtros </span>
        </div>
    
        <vs-divider />

        <div class="mb-1">
            <span class=" font-base text-primary "> Sobre estudios </span>
        </div>
        <div class="mb-1">
            <div> 
                <span class=" text-sm"> Area de Estudios  </span>
            </div>
            <component :is="'menuS'" :attribute="'GradoAcademico.AreaStudio'" :settings ="{ autocomplete : true }" />
        </div>

        <div class="mb-1">
            <div> 
                <span class=" text-sm"> Centro de Estudios </span>
            </div>
            <component :is="'menuS'" :attribute="'GradoAcademico.CentroEstudios'" :settings ="{ autocomplete : true }"/>
        </div>
        
        <div class="mb-1">
            <div> 
                <span class=" text-sm"> Estado de Area de Estudios </span>
            </div>
            <component :is="'menuS'" :attribute="'GradoAcademico.Estado'"/>
        </div>

        <div class="mb-1">
            <div> 
                <span class=" text-sm"> Nivel de estudios </span>
            </div>
            <component :is="'menuS'" :attribute="'GradoAcademico.NivelDeEstudios'" :settings ="{ autocomplete : true }"/>
        </div>
        
        <vs-divider />

        <div class="mb-1">
            <span class=" font-base text-primary "> Sobre Experiencia Laboral </span>
        </div>

        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Empresa donde laboro  </span>
            </div>
            <component :is="'menuS'" :attribute="'ExperienciaLaboral.empresa_donde_laboro'" :settings ="{ autocomplete : true  }" />
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Puesto Cargo  </span>
            </div>
            <component :is="'menuS'" :attribute="'ExperienciaLaboral.PuestoCargo'" :settings ="{ autocomplete : true }" />
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Actividad Empresa  </span>
            </div>
            <component :is="'menuS'" :attribute="'ExperienciaLaboral.ActividadEmpresa'" :settings ="{ autocomplete : true }" />
        </div>

        <vs-divider />

        <div class="mb-1">
            <span class=" font-base text-primary "> Sobre la Persona </span>
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Empresa donde laboro  </span>
            </div>
            <component :is="'menuS'" :attribute="'persona.Genero'"  />
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Provincia de Residencia  </span>
            </div>
            <component :is="'menuS'" :attribute="'persona.Direccion.Provincia'"  />
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Distrito de Residencia  </span>
            </div>
            <component :is="'menuS'" :attribute="'persona.Direccion.Distrito'"  />
        </div>

        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Idioma </span>
            </div>
            <component :is="'menuS'" :attribute="'Idioma.Idioma'"  />
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Habilidad </span>
            </div>
            <component :is="'menuS'" :attribute="'habilidades.Habilidad'"  />
        </div>

        <vs-divider />

        <div class="h-24 flex items-end justify-center">            
            <ais-clear-refinements >
                <vs-button class="w-full" slot-scope="{ canRefine, refine}" @click.prevent="refine" :disabled="!canRefine">Quitar Filtros</vs-button>
            </ais-clear-refinements>
        </div>
        
    </div>
</template>

<script>
import {AisRangeInput , AisClearRefinements} from 'vue-instantsearch'
import {debounce} from "lodash"
import menuS from '../../general/components/menu.vue'
export default {
    data(){
        return{
            min_range : null,
            max_range : null, 
        }
    },
    components: {
        menuS,    
        AisRangeInput   ,
        AisClearRefinements
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