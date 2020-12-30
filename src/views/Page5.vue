<template>
    <div>
        <p>{{ resultado }}<p>
        <div class="">
            <vs-select/>
            <vs-input></vs-input>
        </div>
        <div>
            <div v-for="(postulante,index) in postulantes" :key="index">

                <div v-for="(dato,index) in postulante" :key="index">
                </div>
            </div>
        </div>
        <vs-button @click="generarExcel"/>
    </div>
</template>

<script>
    import XLSX from 'xlsx'
    export default {
        data(){
            return {
                resultado: "holla mundo como estas",
                datos: null,
                postulantes: null
            }
        },
        methods:{
            generarExcel: function () {
                var worksheet = XLSX.utils.aoa_to_sheet(this.datos);
                var new_workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
                console.log('timestamp')
                XLSX.writeFile(new_workbook,'postulates.xlsx')
            }
        },
        beforeMount () {
            this.datos = [
                [ "id",    "name", "value" ],
                [    1, "sheetjs",    7262 ],
                [    2, "js-xlsx",    6969 ]
            ]
        }
    }
</script>