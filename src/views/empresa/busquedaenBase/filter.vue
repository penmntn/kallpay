<template>
    <div class="w-full pt-4 px-3">       
        <div class="mb-1">
            <span class=" font-base text-primary "> Sobre estudios </span>
        </div>
        <div class="mb-1">
            <div> 
                <span class=" text-sm"> Area de Estudios  </span>
            </div>
            <component :is="'menuS'" :attribute="'GradoAcademico.AreaStudio'"  id="busquedaBase_Area" :settings ="{ autocomplete : true }" />
        </div>

        <div class="mb-1">
            <div> 
                <span class=" text-sm"> Centro de Estudios </span>
            </div>
            <component :is="'menuS'" :attribute="'GradoAcademico.CentroEstudios'"   id="busquedaBase_Centro_Estudios"  :settings ="{ autocomplete : true }"/>
        </div>
        
        <div class="mb-1">
            <div> 
                <span class=" text-sm"> Estado de Area de Estudios </span>
            </div>
            <component :is="'menuS'" :attribute="'GradoAcademico.Estado'" id="busquedaBase_grado_academico" />
        </div>

        <div class="mb-1">
            <div> 
                <span class=" text-sm"> Nivel de estudios </span>
            </div>
            <component :is="'menuS'" :attribute="'GradoAcademico.NivelDeEstudios'"  id="busquedaBase_Nivel_estudios" :settings ="{ autocomplete : true }"/>
        </div>
        
        <vs-divider />

        <div class="mb-1">
            <span class=" font-base text-primary "> Sobre Experiencia Laboral </span>
        </div>

        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Empresa donde laboro  </span>
            </div>
            <component :is="'menuS'" :attribute="'ExperienciaLaboral.empresa_donde_laboro'"  id="busquedaBase_Empresa_Nombre"  :settings ="{ autocomplete : true  }" />
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Puesto Cargo  </span>
            </div>
            <component :is="'menuS'" :attribute="'ExperienciaLaboral.PuestoCargo'"  id="busquedaBase_Puesto_Cargo"  :settings ="{ autocomplete : true }" />
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Actividad Empresa  </span>
            </div>
            <component :is="'menuS'" :attribute="'ExperienciaLaboral.ActividadEmpresa'" id="busquedaBase_actividad_empresa" :settings ="{ autocomplete : true }" />
        </div>

        <vs-divider />

        <div class="mb-1">
            <span class=" font-base text-primary "> Sobre la Persona </span>
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Genero  </span>
            </div>
            <component :is="'menuS'" :attribute="'persona.Genero'"  id="busquedaBase_persona_genero" :settings ="{ autocomplete : true }" />
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Provincia de Residencia  </span>
            </div>
            <component :is="'menuS'" :attribute="'persona.Direccion.Provincia'" id="busquedaBase_persona_direccion_provincia" :settings ="{ autocomplete : true }"  />
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Distrito de Residencia  </span>
            </div>
            <component :is="'menuS'" :attribute="'persona.Direccion.Distrito'"   id="busquedaBase_persona_direccion_distrito" :settings ="{ autocomplete : true }" />
        </div>

        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Idioma </span>
            </div>
            <component :is="'menuS'" :attribute="'Idioma.Idioma'"  id="busquedaBase_persona_idioma" :settings ="{ autocomplete : true }" />
        </div>
        <div  class="mb-1">
            <div> 
                <span class=" text-sm"> Habilidad </span>
            </div>
            <component :is="'menuS'" :attribute="'habilidades.Habilidad'"   id="busquedaBase_persona_habilidad"  :settings ="{ autocomplete : true }" />
        </div>
    </div>
</template>

<script>
import {AisRangeInput , AisClearRefinements} from 'vue-instantsearch'
import {debounce} from "lodash"
import menuS from '../../general/components/menu.vue'
export default {

    components: {
        menuS,    
        AisRangeInput   ,
        AisClearRefinements
    },

    methods:{
        input : debounce(function(refine, val1 , val2 ){
            refine({min: val1, max: val2})
        }, 1000)
    }
}
</script>