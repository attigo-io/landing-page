const animatePC=()=>{var e=gsap.timeline({onUpdate:function(){e.progress()}});e.to(".why-us-section__text--title .img-container",{x:150,duration:3,delay:.2}),e.to(".why-us-section__text--title .img-container img",{rotate:0});var t=new ScrollMagic.Controller;new ScrollMagic.Scene({triggerElement:".why-us-section__text",triggerHook:"enEnter",duration:"20%"}).setTween(e).addTo(t);var o=gsap.timeline({onUpdate:function(){o.progress()}});o.from("#card1",{x:-200,opacity:0,duration:1},"one").from("#card2",{y:200,opacity:0,duration:1},"one").from("#card3",{x:200,opacity:0,duration:1},"one"),o.from("#card4",{x:-200,opacity:0,duration:1},"two").from("#card5",{y:200,opacity:0,duration:1},"two").from("#card6",{x:200,opacity:0,duration:1},"two"),o.from("#card7",{y:200,opacity:0,duration:1},"three");var n=new ScrollMagic.Controller;new ScrollMagic.Scene({triggerElement:".why-us-section__cards",triggerHook:"enEnter",duration:"100%"}).setTween(o).addTo(n)},animatePhone=()=>{var e=gsap.timeline({onUpdate:function(){e.progress()}});e.to(".why-us-section__text--title .img-container",{x:150,duration:3,delay:.2}),e.to(".why-us-section__text--title .img-container img",{rotate:0});var t=new ScrollMagic.Controller;new ScrollMagic.Scene({triggerElement:".why-us-section__text",triggerHook:"enEnter",duration:"20%"}).setTween(e).addTo(t);var o=gsap.timeline({onUpdate:function(){o.progress()}});o.from("#card1",{x:-200,opacity:0,duration:1}).from("#card4",{x:200,opacity:0,duration:1}).from("#card2",{x:-200,opacity:0,duration:1}),o.from("#card5",{x:200,opacity:0,duration:1}).from("#card7",{x:-200,opacity:0,duration:1}).from("#card3",{x:200,opacity:0,duration:1}),o.from("#card6",{x:-200,opacity:0,duration:1});var n=new ScrollMagic.Controller;new ScrollMagic.Scene({triggerElement:".why-us-section__cards",triggerHook:"enEnter",duration:"100%"}).setTween(o).addTo(n)};screen.width>1055?animatePC():animatePhone();const toggleMenu=()=>{document.getElementById("nav").classList.toggle("nav--open")},getCode=async()=>{const e=document.getElementById("country_code").value,t=document.getElementById("phone_number").value;if(""==e||""==t)return void toastr.warning("Please Insert contry code and phone number to get code");const{data:o}=await axios.post("https://yupa.io/auth.php",{country_code:e,phone_number:t});console.log(o)},openForm=()=>{gsap.to("#formcontainer",{top:40})},sendForm=async()=>{const e=$("#name").val(),t=$("#company").val(),o=$("#email").val(),n=$("#email").val(),a=$("#code").val(),r=document.getElementById("country_code").value,i=document.getElementById("phone_number").value;if(""==r||""==i)return void toastr.warning("Please Insert contry code and phone number to get code");if(!validateForm())return void toastr.warning("Please fill all info in the form");const c=new FormData;c.append("country_code",r),c.append("phone_number",r),c.append("code",a),c.append("name",e),c.append("company_name",t),c.append("email",o),c.append("request",n);try{const{data:e}=axios.post("https://yupa.io/verify.php",c,{})}catch(e){}},validateForm=()=>""!=$("#name").val()||""!=$("#company").val()||""!=$("#email").val()||""!=$("#req").val()||""!=$("#code").val();
//# sourceMappingURL=script.js.map