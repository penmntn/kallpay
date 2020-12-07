<template>
    <div class="w-full">
            <vs-card :title="title">
                <div slot="header" class="flex justify-between w-full">
                    <div class="flex">
                        <vs-icon icon-pack="feather" class="mr-2" :icon="icon" size="2rem" color="primary"/>
                        <div class="flex"> <p class="font-serif text-xl"> {{title}}</p> </div>
                    </div>
                    <div class="flex">
                        <vs-button v-if="!edit" radius color="primary" type="gradient" icon-pack="feather" icon="icon-edit" size="small" @click="edit=!edit"></vs-button>
                        <vs-button v-if="!edit" radius color="warning" type="gradient" icon-pack="feather" icon="icon-copy" size="small" @click="copyText" ></vs-button>
                        <vs-button v-if="edit" radius color="success" type="gradient" icon-pack="feather" icon="icon-save" size="small" ></vs-button>
                        <vs-button v-if="edit" radius color="danger" type="gradient" icon-pack="feather" icon="icon-x" size="small" @click="edit=!edit"></vs-button>
                    </div>
                </div>
                <div>
                    <div v-if="!edit">
                        <div v-if="vertical" class="px-6">
                            <div class="vx-row" v-for="(item, index) in formulario" :key="index" >
                                <div class="vx-col w-full  shadow hover:bg-gray-200 rounded-full mb-3" v-if="item.dato" @click="CopyValue(item.dato)">
                                    <label  class="text-xs pl-4 ml-2 truncate" :for="'formulario-col' + item.dato"> {{item.label}}</label>
                                    <div class="flex" v-if="item.type!='list'">
                                        <vs-icon icon-pack="feather" class="mr-2" :icon="icon" size="1.30rem" color="primary" />
                                        <p  class="text-lg font-normal truncate"> {{ item.dato }}</p>
                                    </div>
                                    <div v-else-if="item.type='list'">
                                        <vs-dropdown>
                                            <div class="flex">
                                                <vs-icon icon-pack="feather" class="mr-2" :icon="icon" size="1.30rem" color="primary" />
                                                <p class="text-lg font-normal truncate">{{ item.dato[0]}}</p>
                                            </div>
                                            <vs-dropdown-menu>
                                                <vs-dropdown-item v-for="(itemmin, index) in item.dato" :key="index"><p class="text-lg font-normal truncate"> {{ itemmin }}</p></vs-dropdown-item>
                                            </vs-dropdown-menu>
                                        </vs-dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else  class="px-6">
                            <div class="vx-row justify-center">
                                <div :class="['vx-col  w-auto  max-w-1/3 shadow hover:bg-gray-200 rounded-full mb-3 mx-1']" v-for="(item, index) in formulario" :key="index" @click="CopyValue(item.dato)">
                                    <div class="inline" v-if="item.dato">
                                        <label  class="text-xs pl-5 ml-2 truncate" :for="'formulario-col' + item.dato"> {{item.label}}</label>
                                        <div class="flex" :id="'formulario-col' + item.dato" >
                                            <vs-icon icon-pack="feather" class="mr-2" :icon="icon" size="1.30rem" color="primary" @click="CopyValue(item.dato)"/>
                                            <p class="text-lg font-normal truncate"> {{ item.dato }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="vertical" class="px-2">
                            <div class="vx-row mb-3" v-for="(item, index) in formulario" :key="index">
                                <div class="vx-col w-full">
                                    <div v-if="item.type==='input'" class="w-full">
                                        <vx-tooltip :text="item.descripcion" position="top">
                                            <label  class="text-xs" :for="'formulario-col' + item.dato"> {{item.label}}</label>
                                            <vs-input icon-pack="feather" :icon="icon" class="w-full" color="primary"  v-model="item.dato"/>
                                        </vx-tooltip>
                                    </div>
                                    <div v-if="item.type==='date'" class="w-full">
                                        <vx-tooltip :text="item.descripcion" position="top">
                                            <label  class="text-xs" :for="'formulario-col' + item.dato"> {{item.label}}</label>
                                            <flat-pickr class="w-full" :config="item.extra" v-model="item.dato" :placeholder="item.label" />
                                        </vx-tooltip>
                                    </div>
                                    <div v-if="item.type ==='list'" class="w-full">
                                        <vx-tooltip :text="item.descripcion" position="top">
                                            <label class="text-xs" :for="'formulario-col' + item.dato"> {{item.label}}</label>
                                            <v-select multiple :id="'formulario-col' + item.dato" v-model="item.dato" :label="item.label" :options="item.extra" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                                        </vx-tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="px-2">
                            <div class="vx-row mb-3">
                                <div :class="['vx-col', item.dist]"  v-for="(item, index) in formulario" :key="index">
                                    <div v-if="item.type==='input'" class="w-full">
                                        <vx-tooltip :text="item.descripcion" position="top">
                                            <label  class="text-xs" :for="'formulario-col' + item.dato"> {{item.label}}</label>
                                            <vs-input icon-pack="feather" :icon="icon" class="w-full" color="primary"  v-model="item.dato"/>
                                        </vx-tooltip>
                                    </div>
                                    <div v-if="item.type==='date'" class="w-full">
                                        <vx-tooltip :text="item.descripcion" position="top">
                                            <label  class="text-xs" :for="'formulario-col' + item.dato"> {{item.label}}</label>
                                            <flat-pickr class="w-full" :config="item.extra" v-model="item.dato" :placeholder="item.label" />
                                        </vx-tooltip>
                                    </div>
                                    <div v-if="item.type==='list'" class="w-full">
                                        <vx-tooltip :text="item.descripcion" position="top">
                                            <label class="text-xs" :for="'formulario-col' + item.dato"> {{item.label}}</label>
                                            <v-select :id="'formulario-col' + item.dato" :label="item.label" :options="item.extra" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                                        </vx-tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
			</vs-card>
    </div>
</template>
<script>

import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import vSelect from 'vue-select'

export default {
	data(){
    return{
            edit : false
        }
    },
    props: {
        title : {type : String , required : true},
        formulario : { type : [] , required : true },
        vertical : { type : Boolean , default : true },
        icon : {type : String},
    },
	components : {
		VuePerfectScrollbar,
        flatPickr,
        'v-select': vSelect,
	},
	methods : {
		copyText() {
            let result = this.formulario.map(e => { return e.label + ': ' + e.dato}).join('\n')
            this.clipboard(result)
        },
        CopyValue(insert){
            this.clipboard(insert)
        },
        clipboard(insert){
            const thisIns = this;
            this.$copyText(insert).then(function() {
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
        }
	}
}
</script>
