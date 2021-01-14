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
            class="ag-theme-balham"
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
                rowData: null,
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
                    cellRendererFramework: CheckBoxRenderer
                },
                {headerName: 'Usuario', field: 'usuario'},
                {headerName: 'Carrera', field: 'carrera'},
                {headerName: 'Estado', field: 'estado'},
                {headerName: 'Ultima Conexion', field: 'conexion',maxWidth: 500},
                {
                    field: 'opciones',
                    cellRendererFramework: BtnCellRenderer,
                }
            ];

            this.rowData = [
                {
                    usuario: 'Luis Alberto Montesinos Curasi',
                    carrera: 'ing Electrronica',
                    estado: 'connectado',
                    conexion: 'ayer',
                    opciones: 120
                },
                {
                    usuario: 'Wilder Gutierrez Quispe',
                    carrera: 'ing Electrronica',
                    estado: 'connectado',
                    conexion: 'ayer',
                    opciones: 120
                },
                {
                    usuario: 'Alex Chambi Cori',
                    carrera: 'ing Electrronica',
                    estado: 'connectado',
                    conexion: 'ayer',
                    opciones: 120
                },
                {
                    usuario: 'Ferndando Gonzlaes Morales',
                    carrera: 'ing Electrronica',
                    estado: 'connectado',
                    conexion: 'ayer',
                    opciones: 120
                },
                {
                    usuario: 'Zenaida Morales Quispe',
                    carrera: 'ing sistemas',
                    estado: 'connectado',
                    conexion: 'ayer',
                    opciones: 120
                },
            ]
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