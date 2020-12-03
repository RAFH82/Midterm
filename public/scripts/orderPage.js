
$(document).ready(function() {



  $(".qty").on('change',function(){
    console.log("this is the ",this.value);
    let itemTotalElement = $(this).parent().parent().find("span.price");

    let unitPriceElement = $(this).parent().parent().find("span.unit-price");
   let qty = this.value;


   let itemTotal = qty * unitPriceElement.html();


     itemTotalElement.html(Math.floor(itemTotal));

     let spanCollection = $('.price');
     let sum = 0;
     spanCollection.each(function() {
       sum +=parseFloat($(this).html());
     })
     $("footer h2").html(sum);



  })


});
