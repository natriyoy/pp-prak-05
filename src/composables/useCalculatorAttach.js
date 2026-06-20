import { ref } from 'vue'

export function useCalculatorAttach() {
    const attachCalc = ref(false)

    function getCurrentCalculation() {
        const raw = sessionStorage.getItem('bur52_last_calculation')
        if (!raw) return null

        try {
            const parsed = JSON.parse(raw)
            if (parsed && parsed.depth > 0 && parsed.interacted === true) {
                return parsed
            }
        } catch (e) {
            return null
        }

        return null
    }

    const hasCalculation = ref(!!getCurrentCalculation())

    function onCalcCheckboxChange() {
        hasCalculation.value = !!getCurrentCalculation()
    }

    return { attachCalc, hasCalculation, getCurrentCalculation, onCalcCheckboxChange }
}