<template>
    <div>
        <div class="flex flex-row justify-between px-8 mb-4">
            <div class="flex">
                <vs-button icon="delete"/>
                <vs-button icon="block"/>
            </div>
            <vs-input  class="w-1/2" icon="search"></vs-input>
        </div>
        <ag-grid-vue style="width: 100%; height: 100vh;"
            class="ag-theme-alpine"
            :columnDefs="columnDefs"
            :rowData="rowData"
            :defaultColDef="defaultColDef"
            :frameworkComponents="frameworkComponents">
        </ag-grid-vue>
    </div>
</template>

<script> 
    import { AgGridVue }  from 'ag-grid-vue';
    import '@ag-grid-community/core/dist/styles/ag-theme-balham.css'
    import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css'
    import '@ag-grid-community/core/dist/styles/ag-theme-material.css'
    import '@ag-grid-community/core/dist/styles/ag-grid.css'
    import BtnCellRenderer from '../../components/grid-components/OpcionesAdmin.vue'
    import CheckBoxRenderer from '../../components/grid-components/SelectGrid.vue'

    export default {
        components: {
            AgGridVue,
            BtnCellRenderer: 'BtnCellRenderer',
            CheckBoxRenderer: 'CheckBoxRenderer'
        },
        data() {
            return {
                columnDefs: null,
                rowData: [],
                columnApi: null,
                defaultColDef: null,
                frameworkComponents: null,
            }
        },
        beforeMount() {
            this.gridOptions = {}
            this.columnDefs = [
                {
                    field: 'sel',
                    headerName: '',
                    cellRendererFramework: CheckBoxRenderer,
                    width: 50,
                },
                {headerName: 'Usuario', field: 'usuario'},
                {headerName: 'Codigo', field: 'codigo'},
                {headerName: 'Estado', field: 'estado'},
                {headerName: 'Ultima Conexion', field: 'conexion',maxWidth: 500},
                {
                    field: 'opciones',
                    cellRendererFramework: BtnCellRenderer,
                }
            ];
            this.$http.get("/estudiantes").then((res) => {
                for (let estu of res.data){
                    console.log(estu)
                    let temp = {
                        usuario: estu.persona.Nombres + " "+ estu.persona.Apellidos,
                        codigo: estu.CodigoEstudiante
                    }
                    this.rowData.push(temp)
                }
            })
            this.defaultColDef = {
                flex: 1,
                minWidth: 100
            }
            this.frameworkComponents = {
                btnCellRenderer: BtnCellRenderer
            }
        }
    }
</script>
<style lang="scss">
  
</style>