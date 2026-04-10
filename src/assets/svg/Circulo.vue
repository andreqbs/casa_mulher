<template>
<div class="w-[150px] flex items-start justify-start text-start">
    <!-- SVG do círculo que serve como botão -->
    <svg :width="size" :height="size" xmlns="http://www.w3.org/2000/svg" @click="handleClick" class="cursor-pointer">
        <!-- Círculo externo -->
        <circle :cx="size / 2" :cy="size / 2" :r="outerRadius" :fill="isFilled ? computedColor : 'none'"
            :stroke="isFilled ? 'none' : computedColor" :stroke-width="2" />
        <!-- Círculo branco interno -->
        <circle v-if="isFilled" :cx="size / 2" :cy="size / 2" :r="innerRadius" fill="white" />
    </svg>
    <span :style="{ color: computedColor }" class="text-[11px] font-bold-segoe mr-2">{{ label }}</span>
</div>
</template>

<script setup>
    import { computed, ref, defineProps, defineEmits } from 'vue';

    const props = defineProps({
        label: {
            type: String,
            default: '_adicior_texto_aqui_'
        },
        color: {
            type: String,
            default: '#f37335'
        },
        size: {
            type: Number,
            default: 100
        },
        indexRef: {
            type: Number,
            required: true,
        },
    });

    // Estado para controlar se o círculo está preenchido ou contornado
    const isFilled = ref(true); // Inicialmente preenchido

    // Função para alternar o estado de preenchido/contorno
    const toggleFill = () => {
        isFilled.value = !isFilled.value;
    };

    const computedColor = computed(() => {
        return props.color;
    });

    // Computa o raio externo (30% do tamanho)
    const outerRadius = computed(() => {
        return props.size * 0.3;
    });

    // Computa o raio interno (12% do tamanho)
    const innerRadius = computed(() => {
        return props.size * 0.12;
    });

    // Define o evento "emit" para enviar ao componente pai
    const emit = defineEmits(['elementClicked']);

    // Função para alternar visibilidade e emitir o índice
    const handleClick = () => {
        isFilled.value = !isFilled.value;
        emit('elementClicked', props.indexRef); // Emite o evento com o índice
    };

    const toggleVisibility = () => {
        isFilled.value = !isFilled.value;
    };

    defineExpose({
        toggleVisibility,
    });
</script>

<style scoped>
    .flex {
        display: flex;
        align-items: center;
    }

    .cursor-pointer {
        cursor: pointer;
    }
</style>
