import { ref, computed } from 'vue'

export function usePhoneMask(initial = '') {
    const rawPhone = ref(initial)
    const MAX_LENGTH = 18

    function formatPhone(value) {
        let digits = value.replace(/\D/g, '')

        if (digits.startsWith('8')) {
            digits = '7' + digits.slice(1)
        }
        if (!digits.startsWith('7') && digits.length > 0) {
            digits = '7' + digits
        }

        digits = digits.slice(0, 11)

        if (digits.length === 0) return ''

        let result = '+7'
        const rest = digits.slice(1)

        if (rest.length > 0) result += ' (' + rest.slice(0, 3)
        if (rest.length >= 3) result += ')'
        if (rest.length > 3) result += ' ' + rest.slice(3, 6)
        if (rest.length > 6) result += '-' + rest.slice(6, 8)
        if (rest.length > 8) result += '-' + rest.slice(8, 10)

        return result.slice(0, MAX_LENGTH)
    }

    const phone = computed({
        get: () => rawPhone.value,
        set: (value) => {
            rawPhone.value = formatPhone(value)
        }
    })

    const isPhoneValid = computed(() => {
        const digits = rawPhone.value.replace(/\D/g, '')
        return digits.length === 11
    })

    return { phone, isPhoneValid, formatPhone, MAX_LENGTH }
}