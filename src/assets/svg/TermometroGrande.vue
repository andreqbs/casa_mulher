<template>
<div class="bars" @click="handleClick">
    <svg v-if="isVisible" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        :style="{ visibility: isVisible ? 'visible' : 'hidden' }">
        <!-- Borda do termômetro -->
        <rect x="35" y="-315" width="30" height="800" fill="none" :stroke="computedColor" stroke-width="2" rx="15"
            ry="15" />
        <!-- Círculo no fundo -->
        <circle cx="50" cy="500" r="25" fill="none" :stroke="computedColor" stroke-width="5" />
        <!-- Preenchimento variável -->
        <rect id="fill" x="35" :y="computedSizeY" width="30" :height="computedSizeHeigth" :fill="computedColor" rx="30"
            ry="15" />
        <!-- Círculo preenchido no fundo -->
        <circle cx="50" cy="500" r="30" :fill="computedColor" />
    </svg>
    <!-- Espaço do SVG invisível -->
    <div v-else class="placeholder" :style="{ width: '30px', height: '300px' }"></div>
</div>
</template>

<script setup>
    import { ref, computed, defineProps, defineEmits } from 'vue';

    // Recebe props do componente pai, incluindo o índice
    const props = defineProps({
        percentage: {
            type: Number,
            default: 0,
        },
        color: {
            type: String,
            default: '#f37335',
        },
        indexRef: {
            type: Number,
            required: true,
        },
    });

    // Define o evento "emit" para enviar ao componente pai
    const emit = defineEmits(['elementClicked']);

    // Estado para controlar a visibilidade do SVG
    const isVisible = ref(true);

    // Função para alternar visibilidade e emitir o índice
    const handleClick = () => {
        isVisible.value = !isVisible.value;
        emit('elementClicked', props.indexRef); // Emite o evento com o índice
    };

    const toggleVisibility = () => {
        isVisible.value = !isVisible.value;
    };

    const multiplier = 8;

    // Definir a cor do termômetro
    const computedColor = computed(() => {
        return props.color;
    });

    // Cálculo da posição Y e altura com base no preenchimento do termômetro
    const computedSizeY = computed(() => {
        const y = 485 - props.percentage * multiplier;
        return y;
    });

    const computedSizeHeigth = computed(() => {
        const height = props.percentage * multiplier;
        return height;
    });

    defineExpose({
        toggleVisibility,
    });
</script>

<style scoped>
    .bars {
        display: flex;
        justify-content: center;
        cursor: pointer;
    }

    svg {
        width: 30px;
        height: 300px;
    }

    .placeholder {
        width: 30px;
        height: 300px;
    }
</style>
