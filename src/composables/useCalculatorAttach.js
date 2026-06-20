import { ref, onMounted, onUnmounted } from 'vue'

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

    // Слушаем кастомное событие, которое будет диспатчить калькулятор
    // при каждом изменении параметров — это даёт реальную реактивность
    // между PriceCalculator.vue и формой, даже если они на одной странице
    function handleCalcUpdate() {
        hasCalculation.value = !!getCurrentCalculation()
    }

    onMounted(() => {
        window.addEventListener('calculator-updated', handleCalcUpdate)
    })

    onUnmounted(() => {
        window.removeEventListener('calculator-updated', handleCalcUpdate)
    })

    return { attachCalc, hasCalculation, getCurrentCalculation, onCalcCheckboxChange }
}