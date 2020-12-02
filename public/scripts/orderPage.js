
$(document).ready(function() {



  $(".qty").on('change',function(){
    console.log("this is the ",this.value);
    let spanElement = $(this).parent().parent().find("span.price");
    let fixedPrice =  $(this).parent().parent().find("span.fixedPrice");

   let qty = this.value;

   let fixedQuantity = $("fixed-quantity").val();

   let amount;

     amount = fixedPrice.html() * qty;
     spanElement.html(amount);
     let displaytotal = $("footer h2");

     let total = displaytotal.html()*1;
     if (qty > fixedQuantity) {
      total+= fixedPrice.html()*1;
     }
     if (qty < fixedQuantity) {
      total-= fixedPrice.html()*1;
     }


     displaytotal.html(total);



  })


});
