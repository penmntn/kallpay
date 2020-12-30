<template>
    <div>
        <siderp :value="value" @input="cerrarSider" :ancho="600" identificador="preview-curriculum">
            <template v-slot:cuerpo>
                <div ref="perfilPostulante" class="flex flex-col">
                    <div class="flex flex-row justify-between p-10">
                        <vs-switch v-model="data.estaEntrevistado" color="green" class="w-24">
                            <span slot="on">entrevistado</span>
                            <span slot="off">pendiente</span>
                        </vs-switch>
                        <div class="flex flex-col">
                            <p style="text-transform:uppercase"> {{ data.datos.nombres }}</p>
                            <p> ultima actualizacion </p>
                            <p> ultima conexion </p>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between p-10">
                        <div class="flex flex-col">
                            <p> DATOS DE CONTACTO </p>
                            <div v-for="(dato, llave, index) in data.datos" :key="llave" class="flex flex-row">
                                <p class="w-1/2">{{ etiquetasDatos[index] }}</p><p class="w-1/2">{{ dato }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col self-center">
                            <img class="rounded-full h-32 w-32" src="https://upload.wikimedia.org/wikipedia/en/0/06/Robert_Baratheon_Profile_Mark_Addy.jpg"/>
                            <p class="self-center"> S/.{{ data.sueldo }}</p>
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <p> EXPERIENCIA LABORAL </p>
                        <div v-for="(exp,index) in data.experienciaLaboral" :key="index" class="flex flex-row">
                            <div>
                                {{ exp.fecha }}
                            </div>
                            <div class="flex flex-col">
                                <p>{{ exp.cargo }}</p>
                                <p>{{ exp.descripcion }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <p> ESTUDIOS </p>
                        <div v-for="(std,index) in data.estudios" :key="index" class="flex flex-row">
                            <div>
                                {{ std.fecha }}
                            </div>
                            <div class="flex flex-col">
                                <p>{{ std.cargo }}</p>
                                <p>{{ std.descripcion }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <p> MERITOS </p>
                        <div v-for="(mer,index) in data.meritos" :key="index" class="flex flex-row">
                            <div>
                                {{ mer.fecha }}
                            </div>
                            <div class="flex flex-col">
                                <p>{{ mer.cargo }}</p>
                                <p>{{ mer.descripcion }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>    
        </siderp>
    </div>
</template>

<script>
    import siderp from '../side_bar/siderp.vue'
    import html2pdf from 'html2pdf.js'
    export default {
        data () {
            return {
                etiquetasDatos: [
                    "Nombre:",
                    "Numero Telefono:",
                    "Correo:",
                    "Residencia:",
                    "Edad",
                    "Genero",
                ]
            }
        },
        props: {
            data: Object,
            value: Boolean
        },
        components: {
            siderp,
        },
        methods: {
            crearPDF: function () {
                html2pdf(this.$refs.perfilPostulante,{

                })
            },
            cerrarSider: function () {
                this.$emit('input', false)
            }
        }
    }
</script>