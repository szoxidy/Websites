import {ref} from 'vue'

/* ----------------------------------------------------------
 * 1. 状态：isNeon = true ⇒ neon/light；false ⇒ dark
 * ---------------------------------------------------------- */
export const prefersDark = window.matchMedia('(prefers-color-scheme: light)')
const saved = localStorage.getItem('theme')               // "neon" | "dark" | null
export const hasManual = saved !== null

/** 计算初始主题：优先跟随系统 → 否则本地存储 */
export const isNeon = ref<boolean>(
    hasManual ? !prefersDark.matches : saved === 'neon'
)

/* ⭐ 立刻把结果同步到 DOM，保证首屏正确配色 */
updateDomClasses()

/* ----------------------------------------------------------
 * 2. 统一写 DOM & 本地存储
 * ---------------------------------------------------------- */
/** 把 .light-mode / .dark-mode 写到 <html>, 供 CSS 使用 */
function updateDomClasses() {
    const root = document.documentElement
    if (!isNeon.value) {
        root.classList.add('light-mode')
        root.classList.remove('dark-mode')
    } else {
        root.classList.add('dark-mode')
        root.classList.remove('light-mode')
    }
}

/** 核心：设置主题 & 存储 & 同步 DOM */
export function applyTheme(neon: boolean) {
    isNeon.value = neon
    localStorage.setItem('theme', neon ? 'neon' : 'dark')
    updateDomClasses()
}

/* ----------------------------------------------------------
 * 3. 点击切换主题（含 View-Transition 动画）
 * ---------------------------------------------------------- */
export function toggleNeon() {
    applyTheme(!isNeon.value)
}