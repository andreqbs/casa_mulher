import {ProfileInput2} from "@/interfaces/ProfileInput2";

export const firstName = (nomeCompleto: string) => {
    const nomes = nomeCompleto.trim().split(" ");
    return nomes[0] || "";
}

export const aplicarMascaraTelefone = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros.length <= 2) return `(${apenasNumeros}`;
    if (apenasNumeros.length <= 7)
        return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`;
};

export const aplicarMascaraTelefone2 = (valor: string) => {
    const nums = valor.replace(/\D/g, "");

    if (!nums) return "";

    if (nums.length <= 2) {
        return `+${nums}`;
    }

    if (nums.length <= 4) {
        return `+${nums.slice(0, 2)} (${nums.slice(2)}`;
    }

    if (nums.length <= 9) {
        return `+${nums.slice(0, 2)} (${nums.slice(2, 4)}) ${nums.slice(4)}`;
    }

    return `+${nums.slice(0, 2)} (${nums.slice(2, 4)}) ${nums.slice(4, 9)}-${nums.slice(9, 13)}`;
};

export const removerMascaraTelefone = (valor: string) => valor.replace(/\D/g, "");

export function formatBirthday(dateStr: string): string {
    if (!dateStr) return '01-01-1970';

    const [day, month, year] = dateStr.split("/");

    if (!day || !month || !year) return '01-01-1970';

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export const buildProfileInput = (data: any): ProfileInput2 => ({
    name: data.name,
    birthday: formatBirthday(data.birthday),
    gender: data.gender,
    cel: removerMascaraTelefone(data.cel),
    email: data.email
});
