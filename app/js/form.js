const openForm = () => {
    isOpenForm = false ;
    gsap.to('#formcontainer' , {
      top: 40
    })
    setTimeout( doToor, 1000)
  }
  
  const sendForm = async () => {
    const name = $('#name').val();
    const company = $('#company').val();
    const email =  $('#email').val();
    const req = $('.textareareq').val();
    const code = $('#code').val()
    const countryCode = document.getElementById('country_code').value
    const phoneNumber = document.getElementById('phone_number').value
    if(countryCode == '' || phoneNumber == '' ){
      toastr.warning('Please Insert contry code and phone number to get code')
      return
    }
    if(!validateForm()) {
      toastr.warning('Please fill all info in the form')
      return
    }
  
    const fd = new FormData()
    fd.append('country_code' ,countryCode)
    fd.append('phone_number' ,phoneNumber)
    fd.append('code' ,code)
    fd.append('name' ,name)
    fd.append('company_name' ,company)
    fd.append('email' ,email)
    fd.append('request' ,req)
    
    try{
      const { data } = axios.post('https://yupa.io/verify.php' , fd , {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      toastr.success('You request has been registred we will contact you soon')
      
    }catch(err){
      toastr.error('Something went wrong please verify the validation code and try again')
  
    }
  
  
  
  }

  const validateForm = () => {
    if($('#name').val() == '' &&  $('#company').val() == '' && $('#email').val() == '' && $('#req').val() == '' && $('#code').val() == ''  ) return false;
    return true ;
  }
  
  // close on click outside 
  $('#formcontainer').click((event) => {
    if (!$(event.target).closest('.form-container__body').length) {
      gsap.to('#formcontainer' , {
        top: '-2000px'
      })
    }        
  });

  const doToor = () => {
    introJs().setOptions({
      steps: [{
        title: 'Request a demo',
        intro: 'Let us  guid you on how to request a demo'
      },{
        
          element: document.querySelector('#country_code'),
          intro: 'Enter your country code'
        },
        {
        
          element: document.querySelector('#phone_number'),
          intro: 'Enter your phone number'
        },
        {
        
          element: document.querySelector('.form-container__button--get-code'),
          intro: 'Click send to receive validation code on your phone'
        },
        {
        
          element: document.querySelector('#code'),
          intro: 'Write the code you received here'
        },{
          element: document.querySelector('.form-container__form--left'),
          intro: 'Fill the rest of the form'
        }
        ,{
          element: document.querySelector('.form-container__button--send'),
          intro: 'Click send to validate form'
        }
      ],
      tooltipClass : 'mytooltip'
    }).start();}
  