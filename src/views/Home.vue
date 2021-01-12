<template>
	<div>
		<button @click="activar(true)">Activar</button>
		<sider-p :value="activo" identificador="skamkdamskdmsamksdpldpsdasdkamdalplda" :ancho="900" @input="activar">
            <template slot="cuerpo"> 
                <vs-card>
                    <div>
                        dalsdsamdkmaskdmksamdkamsdkmsakdmksamdksad
                        sakdsakmdksad
                        asdkasmdkmsad
                        dksapelwpqleq
                        eqwpe,ld,
                    </div>
                </vs-card>
                hola mundo
            </template>
        </sider-p>
	</div>
</template>

<script>
import siderP from "@/components/side_bar/siderp.vue"

export default {
	data(){
		return {
			activo:  false
		}
	},
    components: {
        siderP
	},
	methods:{
		activar: function(value){
			this.activo=value
		}
	}    
}
</script>