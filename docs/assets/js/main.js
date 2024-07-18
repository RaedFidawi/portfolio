/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const image_path = urlParams.get('images');
    const numImages = urlParams.get('count');
    const idx = urlParams.get('idx');
    
    if (image_path) {
        const swiperWrapper = document.getElementById('image-hold');

        for (let i = 0; i <= numImages; i++) {
            const swiperSlide = document.createElement('div');
            swiperSlide.className = 'swiper-slide';

            const img = document.createElement('img');
            img.src = `assets/img/${image_path}/${i}.png`;

            swiperSlide.appendChild(img);
            swiperWrapper.appendChild(swiperSlide);
        }
    } else {
        console.error('Parameter "images" not found in the URL.');
    }
    
    const project_pool = [
      { "url": 'https://github.com/ZeinShehab/Connect-Four', 
        "description": "This is a terminal-based implementation of the classic game connect four. Each player plays once trying to stack 4 of their pieces in a straight line vertically, horizentally, diagonally. We implemented an AI bot using the minimax algorithm that users can play against. The bot has 3 levels of difficulty and the users can pick the difficulty based on how good they're feeling :)"
      },
      {
        "url": 'https://github.com/ZeinShehab/SpaceFood',
        "description": "SpaceFood is a social media web app that lets users post their recipes online and view other recipes. Users can become chefs by uploading a certificate of cooking and the system will register them as chefs. Users must first create an account, verify their email and login. Users can like, share, comment, and rate recipes."
      },
      {
        "url": 'https://zeinshehab.github.io/Labeeb/',
        "description": "Labeeb is a mobile application that translates lebanese sign language and can recognize static and dynamic (moving symbols) gestures. Labeeb can translate all alphabets and words made by a signer and will output the translation in real time. The output is then constructed into a sentence using a matching algorithm that works by leaving as less trailing characters as possible."
      },
      {
        "url": 'https://github.com/ZeinShehab/HiggsClassification',
        "description": "This project is a machine learning projects that detects higgs boson particles. The data was taken from a university paper. We trained a boosted tree model using sklearn (XGBoost) and got a 76% accuracy."
      },
      {
        "url": 'https://github.com/ZeinShehab/Networking-Project',
        "description": "This project was an implementation of a social media application using java, JFrame and web sockets. Users can register, login, post, comment and like on posts, and follow friends. Followers posts will show up on the users feed and vice versa."
      },
      {
        "url": '',
        "description": "Currently writing a research paper about our proposed model for Arabic sign language. We have developed two machine learning models (static and dynamic sign language classification models) and we argue that we have a more sophisticated model than most Arabic sign language models."
      }

    ]

    const project_info = document.getElementById('proj-info');
    const ul = document.createElement('ul');

    const li1 = document.createElement('li');
    const a = document.createElement('a');
    a.href =  project_pool[parseInt(idx)]['url']
    a.textContent = 'See Project'
    if (project_pool[parseInt(idx)]['url'] == '') {
      a.textContent = 'In progress'
    }
    a.target = "_blank"
    li1.appendChild(a)

    const p = document.createElement('p');
    p.textContent = project_pool[parseInt(idx)]['description']

    ul.appendChild(li1);

    project_info.appendChild(ul);
    project_info.appendChild(p)
});

})()