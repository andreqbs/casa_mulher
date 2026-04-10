import { useCallback, useRef, useState } from 'react';

type BreathState = 'idle' | 'inspire' | 'hold' | 'exhale';

export const useRespirar = (
    inspireTime: number,
    holdTime: number,
    exhaleTime: number,
    holdEndTime: number
) => {
    const [breathState, setBreathState] = useState<BreathState>('idle');
    const timers = useRef<NodeJS.Timeout[]>([]);
    const indexRef = useRef(0);

    const steps = [
        { state: 'inspire' as BreathState, time: inspireTime },
        { state: 'hold'    as BreathState, time: holdTime },
        { state: 'exhale'  as BreathState, time: exhaleTime },
        { state: 'hold'    as BreathState, time: holdEndTime },
    ];

    const clearTimers = () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    };

    const advance = () => {
        const step = steps[indexRef.current];

        setBreathState(step.state);

        const timer = setTimeout(() => {
            indexRef.current = (indexRef.current + 1) % steps.length;
            advance();
        }, step.time);

        timers.current.push(timer);
    };

    const inicio = useCallback(() => {
        clearTimers();
        indexRef.current = 0;
        advance();
    }, []);

    const parar = useCallback(() => {
        clearTimers();
        indexRef.current = 0;
        setBreathState('idle');
    }, []);

    return {
        breathState,
        inicio,
        parar,
    };
};
