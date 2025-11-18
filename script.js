const dot = document.querySelector(".cursor-dot")
const outline = document.querySelector(".cursor-outline")
const body = document.body
let mouseX = window.innerWidth / 2
let mouseY = window.innerHeight / 2
let outlineX = mouseX
let outlineY = mouseY
const ease = 0.18

document.addEventListener("mousemove", e => {
    mouseX = e.clientX
    mouseY = e.clientY
    dot.style.left = mouseX + "px"
    dot.style.top = mouseY + "px"
})

function raf() {
    outlineX += (mouseX - outlineX) * ease
    outlineY += (mouseY - outlineY) * ease
    outline.style.left = outlineX + "px"
    outline.style.top = outlineY + "px"
    requestAnimationFrame(raf)
}
raf()

document.addEventListener("mousedown", () => { body.classList.add("clicking") })
document.addEventListener("mouseup", () => { body.classList.remove("clicking") })

const links = document.querySelectorAll("a, button, .card")
links.forEach(el => {
    el.addEventListener("mouseenter", () => { body.classList.add("link-hover") })
    el.addEventListener("mouseleave", () => { body.classList.remove("link-hover") })
})

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section-anim")
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("in")
                observer.unobserve(e.target)
            }
        })
    }, { threshold: 0.12 })
    sections.forEach(s => observer.observe(s))

    const fills = document.querySelectorAll(".bar-fill")
    fills.forEach(f => {
        const target = f.style.width || f.getAttribute("data-target") || "0%"
        f.style.width = "0%"
        setTimeout(() => { f.style.width = target }, 80)
    })

    const cards = document.querySelectorAll(".card-anim")
    cards.forEach((c, i) => { c.style.animationDelay = (i * 80) + "ms"; c.classList.add("card-anim") })

    document.querySelectorAll("a[href^='#']").forEach(a => {
        a.addEventListener("click", e => {
            const href = a.getAttribute("href")
            const target = document.querySelector(href)
            if (target) {
                e.preventDefault()
                target.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        })
    })
})
