const openForm=()=>{isOpenForm=!1,gsap.to("#formcontainer",{top:40}),setTimeout(doToor,1e3)},sendForm=async()=>{const e=$("#name").val(),o=$("#company").val(),t=$("#email").val(),n=$(".textareareq").val(),r=$("#code").val(),a=document.getElementById("country_code").value,c=document.getElementById("phone_number").value;if(""==a||""==c)return void toastr.warning("Please Insert contry code and phone number to get code");if(!validateForm())return void toastr.warning("Please fill all info in the form");const i=new FormData;i.append("country_code",a),i.append("phone_number",c),i.append("code",r),i.append("name",e),i.append("company_name",o),i.append("email",t),i.append("request",n);try{const{data:e}=axios.post("https://yupa.io/verify.php",i,{headers:{"Content-Type":"application/x-www-form-urlencoded"}});toastr.success("You request has been registred we will contact you soon")}catch(e){toastr.error("Something went wrong please verify the validation code and try again")}},validateForm=()=>""!=$("#name").val()||""!=$("#company").val()||""!=$("#email").val()||""!=$("#req").val()||""!=$("#code").val();$("#formcontainer").click((e=>{$(e.target).closest(".form-container__body").length||gsap.to("#formcontainer",{top:"-2000px"})}));const closeForm=()=>{gsap.to("#formcontainer",{top:"-2000px"})},doToor=()=>{introJs().setOptions({steps:[{title:"Request a demo",intro:"Let us  guid you on how to request a demo"},{element:document.querySelector("#country_code"),intro:"Enter your country code"},{element:document.querySelector("#phone_number"),intro:"Enter your phone number"},{element:document.querySelector(".form-container__button--get-code"),intro:"Click send to receive validation code on your phone"},{element:document.querySelector("#code"),intro:"Write the code you received here"},{element:document.querySelector(".form-container__form--left"),intro:"Fill the rest of the form"},{element:document.querySelector(".form-container__button--send"),intro:"Click send to validate form"}],tooltipClass:"mytooltip"}).start()};
//# sourceMappingURL=form.js.map