import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '.anim-blur') {
    let observer = null

    onMounted(() => {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('go')
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.12 })

        document.querySelectorAll(selector).forEach(el => observer.observe(el))
    })

    onUnmounted(() => {
        if (observer) observer.disconnect()
    })
}