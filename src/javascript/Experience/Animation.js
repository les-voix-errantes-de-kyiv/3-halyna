import gsap from 'gsap';
import EventEmitter from './Utils/EventEmitter'
import Experience from "./Experience";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger);

export default class Animation extends EventEmitter{
  constructor(){
    super()

    this.experience = new Experience();
    this.camera = this.experience.camera.instance
    this.scrollY = window.scrollY;
    this.sizes = this.experience.sizes;
    this.objectsDistance = this.experience.world.objectsDistance;

    this.titleAnimation();
    this.footerAnimation();
  }

  titleAnimation() {
    this.title = document.querySelector('.home hgroup h1');
    this.subtitle = document.querySelector('.home hgroup p');

    const homeTl = gsap.timeline({ease: "circ.out"});
    const splitTitle = new SplitType(this.title, {type: "chars"});

    homeTl.set(this.subtitle, {y: -30, opacity: 0})
    homeTl.from(splitTitle.chars, {
      duration: 0.5,
      opacity: 0,
      y: 30,
      stagger: {
        amount: 0.7,
        from: "random"
      }
    });
    homeTl.to(this.subtitle, {
      duration: 1, 
      opacity: 1,
      y: 0
    });

  }

  footerAnimation() {
    this.footer = document.querySelector('footer');
    this.footerText = this.footer.querySelectorAll('p');
    
    const splitText = new SplitType(this.footerText, {type: "chars"});

    const animateFooter = () => {
      gsap.from(splitText.chars, {
          duration: 0.4,
          opacity: 0,
          y: 30,
          delay: 2,
          stagger: {
            amount: 0.8
          }
      });
      observer.disconnect();
  };

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateFooter();
          }
      });
  });

  observer.observe(this.footer);
  }

  cameraMove (section, posY, posZ) {
    gsap.to(this.camera.position, {
      z: posZ,
      y: posY,
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        ease: "circ.out",
        scrub: true,
      },
    });
  }

  revealMessages(messageBox, messages) {
    gsap.from(messages, {
      scrollTrigger: {
        trigger: messageBox,
        pin: true,
        scrub: 1,
        start: "top 400",
        end: "top center"
      },
      opacity: 0,
      y: 100,
      ease: "circ.out",
      duration: 3,
      stagger: {
        amount: 1
      }
    });
  }

  displayTitle(slide) {
    this.title = slide.querySelector('hgroup');
    this.city = this.title.querySelector('h2');
    this.distanceBox = this.title.querySelector('.distance');
    this.distanceText = this.title.querySelector('.distance__value');
    this.dateTime = this.title.querySelector('time');
    
    this.triggerStart = slide.querySelector('[data-title="start"]')
    this.triggerEnd = slide.querySelector('[data-title="end"]')

    const fadeInTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.triggerStart,
        start: '-=10 bottom',
        end: 'bottom center',
        scrub: true,
      },
    });

    fadeInTimeline.to(this.title, {
      opacity: 1,
      onStart: () => {
        gsap.set(this.title, { opacity: 0 });
      },
    });

    if (this.triggerEnd) {
      const fadeOutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: this.triggerEnd,
          start: 'top bottom',
          end: 'bottom center',
          scrub: true,
        },
      });

      fadeOutTimeline.to(this.title, {
        opacity: 0,
      });
    }

    const titleTl = gsap.timeline();

    const splitCityName = new SplitType(this.city, {type: "chars"});

    titleTl.from(splitCityName.chars, {
      duration: 0.5, 
      opacity: 0,
      y: 30, 
      autoAlpha: 0,
      stagger: {
        amount: 0.7,
        from: "random"
      }
    });
    titleTl.from(this.distanceBox, {
      duration: 0.5, 
      opacity: 0,
      autoAlpha: 0,
      stagger: 0.05,
      delay: 0.5,
      onStart: () => {
        if (this.distanceText) {
          this.scrollingNumber(this.distanceText);
        }
      }
    });
    titleTl.from(this.dateTime, {
      duration: 0.8, 
      opacity: 0,
      y: -30,
    }, '-=0.5');
  }

  scrollingNumber(text){
    let numberFrom = text.getAttribute('data-from')
    const numberTo = text.getAttribute('data-to')
    text.innerText = numberFrom.toString()

    setInterval((scrollingNumber) => {
      if((numberFrom - numberTo) != 0){
        numberFrom++
        text.innerText = numberFrom.toString()
      }
    }, 5);
  }

  displayGradientLayer(element) {
    gsap.from(element, {
      duration: 0.8, 
      opacity: 0,
      y: 100,
    });
  }
}
