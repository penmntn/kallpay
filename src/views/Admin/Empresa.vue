<template>
    <div>
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
    import  { AgGridVue }  from 'ag-grid-vue';
    import '@ag-grid-community/core/dist/styles/ag-theme-balham.css'
    import '@ag-grid-community/core/dist/styles/ag-theme-material.css'
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
                
            }
        },
        beforeMount() {
            this.gridOptions = {}
            this.columnDefs = [
                {headerName: 'Empresa/Institucion', field: 'nombreI'},
                {headerName: 'Avisos', field: 'avisos'},
                {headerName: 'Estado', field: 'estado'},
                {headerName: 'Ultima Conexion', field: 'conexion',maxWidth: 500},
                {
                    field: 'opciones',
                    cellRendererFramework: BtnCellRenderer,
                }
            ];

            this.rowData = [
                {
                    nombreI: 'Electro Puno S. A. C.',
                    avisos: 2,
                    estado: 'desconectado',
                    conexion: 'ayer',
                    opciones: 120
                },
                {
                    nombreI: 'MESA Puno S. A. C.',
                    avisos: 2,
                    estado: 'desconectado',
                    conexion: 'ayer',
                    opciones: 120
                },
                {
                    nombreI: 'Municipalidad Provincial de Puno',
                    avisos: 2,
                    estado: 'desconectado',
                    conexion: 'ayer',
                    opciones: 120
                }
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
