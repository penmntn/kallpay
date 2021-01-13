<template>
	<div>
		<button @click="activar('skamkdamskdmsamksdpldpsdasdkamdalplda',true)">Activar</button>
		<sider-p identificador="skamkdamskdmsamksdpldpsdasdkamdalplda" :ancho="1300" >
            <template slot="cuerpo"> 
                <vs-card>
                    <div>
                        dalsdsamdkmaskdmksamdkamsdkmsakdmksamdksad
                        sakdsakmdksad
                        asdkasmdkmsad
                        dksapelwpqleq
                        eqwpe,ld,
						<button @click="activar('samksmakmsakms',true)">Activar</button>
                    </div>
                </vs-card>
                hola mundo
            </template>
        </sider-p>
		<sider-p identificador="samksmakmsakms" :ancho="900" >
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
import siderP from "@/components/side_bar/sider.vue"

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
		activar: function(id, value){
			let payload = { id :  id , state : value} 
			this.$store.commit('UPDATE_SIDER', payload)
		}
	}    
}
</script>