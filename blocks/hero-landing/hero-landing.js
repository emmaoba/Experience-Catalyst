export default function decorate(block) {
  // Set background image
  const section = block.closest('.section');
  if (section) {
    section.style.backgroundImage = 'url(/content/color/images/bg-hero.jpg)';
    section.style.backgroundPosition = 'right center';
    section.style.backgroundRepeat = 'no-repeat';
    section.style.backgroundSize = 'contain';
  }
}
