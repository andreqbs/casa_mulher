const DEBUG_ENABLED = __API_PROVIDER_DEBUG__;

const PROVIDER_LABEL = `[${__APP_CHAT_PROVIDER__}]`;

function noop() {}

export const debug = {
    log: DEBUG_ENABLED
        ? (...args: unknown[]) => console.log(PROVIDER_LABEL, ...args)
        : noop,
    warn: DEBUG_ENABLED
        ? (...args: unknown[]) => console.warn(PROVIDER_LABEL, ...args)
        : noop,
    error: DEBUG_ENABLED
        ? (...args: unknown[]) => console.error(PROVIDER_LABEL, ...args)
        : noop,
};
