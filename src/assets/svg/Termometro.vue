<template><svg viewBox="0 0 70 150" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="20" width="20" height="100" fill="none" :stroke="computedColor" stroke-width="4" rx="10" ry="10" />
    <circle cx="50" cy="130" r="19" fill="none" :stroke="computedColor" stroke-width="5" />
    <rect id="fill" x="40" width="20" :y="computedSizeY" :height="computedSizeHeigth" :fill="computedColor" rx="10"
        ry="10" />
    <circle cx="50" cy="131" r="20" :fill="computedColor" />
</svg></template>

<script setup>
    import { ref, defineProps, computed } from 'vue';

    const props = defineProps({
        percentage: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: '#f37335'
        }
    });

    /*  No elemento abaixo, para o valor original para preencher o termômetro até 100% é:
        y="20" height="100" = 100% do termômetro
        Para cada 1px ponto adicionado ao valor de y deve ser removido 1px do valor de height.
        y="110" height="20" = 0% do termômetro

        Proporção de preenchimento do termômetro
        P       Y       H
        0%	    110	    20
        10%	    101	    28
        20%	    92	    36
        30%	    83	    44
        40%	    74	    52
        50%	    65	    60
        60%	    56	    68
        70%	    47	    76
        80%	    38	    84
        90%	    29	    92
        100%	20	    100
    */

    const computedColor = computed(() => {
        return props.color;
    });

    const computedSizeY = computed(() => {
        const y = 110 - (props.percentage * 0.9);
        return y;
    });

    const computedSizeHeigth = computed(() => {
        const height = 20 + (props.percentage * 0.9);
        return height;
    });
</script>
