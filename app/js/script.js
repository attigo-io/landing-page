let isOpenForm = false ;

const animatePC = () => {
	var t1 = gsap.timeline({ onUpdate: updatePurcentage1 });
    t1.to('.why-us-section__text--title .img-container', { x: 170, duration: 3, delay: 0.2 })
    t1.to('.why-us-section__text--title .img-container img', {
      rotate: 0
    })
    var controller1 = new ScrollMagic.Controller();
    const scene1 = new ScrollMagic.Scene({
      triggerElement: '.why-us-section__text',
      triggerHook: 'enEnter',
      duration: '20%',
    })
      .setTween(t1)
      .addTo(controller1);

    function updatePurcentage1() {
      t1.progress();
    }


    var t2 = gsap.timeline({ onUpdate: updatePurcentage2 });
    t2.from(
      '#card1',
      {
        x: -200,
        opacity: 0,
        duration: 1,
      },
      'one'
    )
      .from(
        '#card2',
        {
          y: 200,
          opacity: 0,
          duration: 1,
        },
        'one'
      )
      .from(
        '#card3',
        {
          x: 200,
          opacity: 0,
          duration: 1,
        },
        'one'
      );
    t2.from(
      '#card4',
      {
        x: -200,
        opacity: 0,
        duration: 1,
      },
      'two'
    )
      .from(
        '#card5',
        {
          y: 200,
          opacity: 0,
          duration: 1,
        },
        'two'
      )
      .from(
        '#card6',
        {
          x: 200,
          opacity: 0,
          duration: 1,
        },
        'two'
      );

    t2.from(
      '#card7',
      {
        y: 200,
        opacity: 0,
        duration: 1,
      },
      'three'
    );
    var controller2 = new ScrollMagic.Controller();
    const scene2 = new ScrollMagic.Scene({
      triggerElement: '.why-us-section__cards',
      triggerHook: 'enEnter',
      duration: '100%',
    })
      .setTween(t2)
      .addTo(controller2);
    function updatePurcentage2() {
      t2.progress();
    }
}

const animatePhone = () => {
	var t1 = gsap.timeline({ onUpdate: updatePurcentage1 });
    t1.to('.why-us-section__text--title .img-container', { x: 170,  duration: 3, delay: 0.2 })
    t1.to('.why-us-section__text--title .img-container img', {
      rotate: 0
    })
    var controller1 = new ScrollMagic.Controller();
    const scene1 = new ScrollMagic.Scene({
      triggerElement: '.why-us-section__text',
      triggerHook: 'enEnter',
      duration: '20%',
    })
      .setTween(t1)
      .addTo(controller1);

    function updatePurcentage1() {
      t1.progress();
    }


    var t2 = gsap.timeline({ onUpdate: updatePurcentage2 });
    t2.from(
      '#card1',
      {
        x: -200,
        opacity: 0,
        duration: 1,
      }
    )
      .from(
        '#card4',
        {
          x: 200,
          opacity: 0,
          duration: 1,
        }
      )
      .from(
        '#card2',
        {
          x: -200,
          opacity: 0,
          duration: 1,
        }
      );
    t2.from(
      '#card5',
      {
        x: 200,
        opacity: 0,
        duration: 1,
      }
    )
      .from(
        '#card7',
        {
          x: -200,
          opacity: 0,
          duration: 1,
        }
      )
      .from(
        '#card3',
        {
          x: 200,
          opacity: 0,
          duration: 1,
        }
      );

    t2.from(
      '#card6',
      {
        x: -200,
        opacity: 0,
        duration: 1,
      }
    );
    var controller2 = new ScrollMagic.Controller();
    const scene2 = new ScrollMagic.Scene({
      triggerElement: '.why-us-section__cards',
      triggerHook: 'enEnter',
      duration: '100%',
    })
      .setTween(t2)
      .addTo(controller2);
    function updatePurcentage2() {
      t2.progress();
    }
}


screen.width > 1055 ? animatePC() : animatePhone()


const toggleMenu  = () => {
	const nav = document.getElementById('nav')
	nav.classList.toggle('nav--open');
}

const getCode = async  () => {
  const countryCode = document.getElementById('country_code').value
  const phoneNumber = document.getElementById('phone_number').value
  if(countryCode == '' || phoneNumber == '' ){
    toastr.warning('Please Insert contry code and phone number to get code')
    return
  }

  const fd = new FormData();
  fd.append('country_code' ,countryCode);
  fd.append('phone_number' , phoneNumber);
  $('.form-container__button--send').attr('disabled' , false);

  try{
    const { data } = await axios.post('https://yupa.io/auth.php' , fd , {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    toastr.success("An sms was sent to your number")
  }catch(err){
    toastr.error("Something went wrong please verify your data")
  }
  
}


