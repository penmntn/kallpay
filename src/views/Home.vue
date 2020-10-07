<template>
	<div>
		<button @click="activar({id : 'primero', level : 0})"> sider 1 </button>
		<button @click="activar({id : 'tercero', level : 0})"> sider 3</button>
		<button @click="rett"> sdnjsjkdnsnd </button>
		<sider :id="'primero'" :level="0" > 
			<template slot="title"> 
				fgfsgsgdsfgfsgsgsgsfgsgfsgfsgsgs
			</template>
			<template slot ="body">
				<login></login>
				<button @click="activar({id : 'segundo', level : 1})"> sider 2</button>
			</template>
		</sider>
		<sider :id="'tercero'" :level="0"> 
		</sider>
		<sider :id="'segundo'" :level="1"> 
		</sider>
		<div class="md:w-9/12 sm:w-full">
			<form-gen :vertical="false" :title="'Datos personales'"  :icon="'icon-user'" :formulario="formulario" >  </form-gen>
		</div>
		<div class="md:w-3/12 sm:w-full">
			<form-gen :vertical="true" :title="'Datos personales'"  :icon="'icon-user'" :formulario="formulario" >  </form-gen>
		</div>
		<vs-upload action="https://jsonplaceholder.typicode.com/posts/"/>
		<vs-divider />
		<div class="w-4/12">
			<vs-image :src="`https://media1.tenor.com/images/039ef9592d0eb63596f695c1f65c2502/tenor.gif?itemid=9989174`"/>
		</div>
		<vs-divider />
	</div>
</template>
<script>

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import sider from '../components/side_bar/sider.vue'
import formGen  from '../components/forms/form'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import login from '../views/pages/login/Login'

export default {
	data(){
	return{
		formulario :  [
			{ dato : 'Wilder Anderson gutierrez' , label : 'Nombre' , descripcion : 'nombres completos del cliente' , type: 'input' , dist : 'w-4/12'},
			{ dato : 'samsung galaxy a30s' , label : 'Equipo Seleccionado' , descripcion : 'equipo que estas vendiendo', type : 'list' , extra : [ 'hola', 'como estas', 'mundo'] ,dist : 'w-4/12'},
			{ dato : '2019 - 15' , label : 'fecha' , descripcion : 'fecha de registro' , type : 'input' , extra : { enableTime: true, dateFormat: 'd-m-Y H:i' } , dist : 'w-4/12'},
			{ dato : '2019 - 15' , label : 'fecha' , descripcion : 'fecha de registro' , type : 'input' , extra : { enableTime: true, dateFormat: 'd-m-Y H:i' } , dist : 'w-6/12'},
			{ dato : '2019 - 15' , label : 'fecha' , descripcion : 'fecha de registro' , type : 'input' , extra : { enableTime: true, dateFormat: 'd-m-Y H:i' } , dist : 'w-6/12'},
			{ dato : '2019 - 15' , label : 'fecha' , descripcion : 'fecha de registro' , type : 'input' , extra : { enableTime: true, dateFormat: 'd-m-Y H:i' } , dist : 'w-full'}
		],
		datetime: null,
		configdateTimePicker: {
			enableTime: true,
			dateFormat: 'd-m-Y H:i'
		},
		numero: 0,
		value  : "",
		switch1: false,
		activo2: false,
		activo3: false,
		ancho : "primero",
		index : 5300, 
		active:false,
			settings: {
				maxScrollbarLength : 100,
				wheelSpeed         : .50,
				}
			}
	},
	components : {
		sider,
		VuePerfectScrollbar,
		flatPickr,
		formGen,
		login
	}, 
	computed: {
		ret() {return this.$store.state.test },  
		token : function(){ return this.$store.state.auth.accessToken }, 
		scrollbarTag() {  return this.$store.getters.scrollbarTag }
	},
	methods : {
		copyText() {
			const thisIns = this;
            this.$copyText(this.datetime).then(function() {
                thisIns.$vs.notify({
                    text: 'Texto copiado exitosamente',
                    color: 'success',
                    iconPack: 'feather',
                    position: 'bottom-right',
                    icon: 'icon-check-circle'
                })
            },function(){
                thisIns.$vs.notify({
                    text: 'Error al copiar el texto',
                    color: 'danger',
                    iconPack: 'feather',
                    position: 'bottom-right',
                    icon: 'icon-alert-circle'
                })
            })
        },
		activar(payload){
			this.$store.commit('UDPATE_SIDER_STATE_ACTIVE', { id : payload.id, level : payload.level , active :  true })
		},
		rett(){
			this.$store.state.test +=1
		}
	}
}
</script>

<style lang="scss">
	
#primero {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 1200px;
    max-width: 85vw;
    // @appl011y shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
  }
}
#segundo {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 300px;
    max-width: 85vw;
    // @apply shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
  }
}
#segundo {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 300px;
    max-width: 85vw;
    // @apply shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
  }
}
#tercero {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 900px;
    max-width: 85vw;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
  }
}
</style>
