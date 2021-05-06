import gsap from 'gsap'
import Splitting from 'splitting'
import throttle from 'lodash.throttle'

const hero = document.querySelector('[data-hero]')

// Menu
const menuButton = document.querySelector('[data-btn="menu"]')
const menu = document.querySelector('[data-menu]')

menuButton.addEventListener('click', () => {
    menu.classList.toggle('is-open')
    menuButton.classList.toggle('is-active')
})

// Text animation
Splitting()

const onMouseMove = (e) => {
    const { clientX, clientY } = e
    // Normalize values to [0 - 100] range
    const x = Math.round((clientX / window.innerWidth) * 100)
    const y = Math.round((clientY / window.innerHeight) * 100)

    gsap.to(hero, {
        "--x": `${x}%`,
        "--y": `${y}%`,
        duration: 0.3,
        ease: "sine.out",
    })
}

// Set initial text styles before animation
gsap.set('.hero--primary .char', {
    opacity: 0,
    y: 25
})

// Timeline
const t1 = gsap.timeline({delay: 1})

t1.to('.hero--primary .char', {
    opacity: 1,
    y: 0,
    duration: 0.75,
    stagger: 0.1,
})
  .to(hero, {
      "--maskSize1": "15%",
      duration: 0.5,
      ease: "back.out(2)",
  })
  .to(hero, {
      "--maskSize2": "24%",
      "--maskSize3": "calc(24% + 0.1rem)",
      duration: 0.5,
      delay: 0.3,
      ease: "back.out(2)",

  })
  .then(() => {
      window.addEventListener('mousemove', throttle(onMouseMove, 30))
  });
