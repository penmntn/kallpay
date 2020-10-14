<template>
    <div>
        <vs-card>
            <div class="primary font-medium text-2xl text-primary">  <font-awesome-icon :icon="['fa', 'user-edit']" sping /> {{formulario.titulo}}</div>
            <div></div>
            <div></div>
        </vs-card>
    </div>
</template>

<script>

export default {

    props: {
        formulario: {type: Object}
    }
}
</script>