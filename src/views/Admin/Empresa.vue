<template>
    <div class="flex flex-col space-y-4">
        <div class="w-full justify-end  flex flex-row">
            <div class="w-2/3 flex flex-row">
                <vs-input class="w-full" v-model="searchBar" @keydown.enter="buscarPorNombre"/>
                <vs-button icon="search" @click="buscarPorNombre"/>
            </div>
        </div>
        <div class="">
            <div class="absolute w-full h-full vs-con-loading__container" ref="contendorAggridEmpresas"/>
        <ag-grid-vue style="width: 100%; height: 100vh;"
            class="ag-theme-alpine"
            :columnDefs="columnDefs"
            :rowData="rowData"
            :defaultColDef="defaultColDef"
            :frameworkComponents="frameworkComponents"
            :gridOptions="gridOptions"/>
        </div>
    </div>
</template>

<script>
    import  { AgGridVue }  from 'ag-grid-vue';
    import '@ag-grid-community/core/dist/styles/ag-theme-balham.css'
    import '@ag-grid-community/core/dist/styles/ag-theme-material.css'
    import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css'
    import '@ag-grid-community/core/dist/styles/ag-grid.css'
    import  BtnCellRenderer from '../../components/grid-components/OpcionesAdmin.vue'

    export default {
        components: {
            AgGridVue,
            BtnCellRenderer: 'BtnCellRenderer'
        },
        data() {
            return {
                columnDefs: null,
                rowData: null,
                columnApi: null,
                defaultColDef: null,
                frameworkComponents: null,
                searchBar: ''
            }
        },
        beforeMount() {
            this.gridOptions = {}
            this.columnDefs = [
                {
                    headerName: 'Empresa/Institucion',
                    field: 'NombreEmpresa',
                    cellStyle: {
                        'border-right-color': '#e2e2e2'
                    },
                },
                {
                    headerName: 'Avisos',
                    field: 'cantAvisos',
                    cellStyle: {
                        'border-right-color': '#e2e2e2',
                    },
                },
                {
                    headerName: 'Email',
                    field: 'Email',
                    cellStyle: {
                        'border-right-color': '#e2e2e2'
                    },
                },
                {
                    headerName: 'Ultima Conexion',
                    field: 'conexion',
                    maxWidth: 500,
                    cellStyle: {
                        'border-right-color': '#e2e2e2',
                        'height': '100%'
                    },
                },
                {
                    field: 'opciones',
                    cellRendererFramework: BtnCellRenderer,
                    cellRendererParams: {
                        color: 'datos pasados'
                    },
                    cellStyle: {
                        'text-align': 'center',
                        'height': '100%'
                    }
                }
            ];


            this.rowData = []
            this.defaultColDef = {
                flex: 1,
                minWidth: 100
            }
            this.frameworkComponents = {
                btnCellRenderer: BtnCellRenderer
            }
        },
        mounted: function () {
            this.gridOptions.api.sizeColumnsToFit()
            this.$vs.loading({
                container: this.$refs.contendorAggridEmpresas
            })
            this.$http.get("/empresalista").then((res) => {
                this.rowData = res.data
                this.$vs.loading.close(this.$refs.contendorAggridEmpresas)
            })
        },
        computed:{
            mostarVuex: function () {
                return this.$store.state.botonesEmpresa
            }
        },
        watch: {
            searchBar: function () {

            }
        },
        methods:{
            buscarPorNombre: function () {
                this.$http.post('/empresasbynombre',{nombre: this.searchBar}).then( (res) => {
                    this.gridOptions.api.setRowData(res.data)
                })
            }
        }
    }
</script>
<style lang="scss">
  
</style>
