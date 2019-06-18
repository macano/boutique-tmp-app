$(document).ready(function() {
  $('#replace_pick').click(function() {
    $("#pick_form").bind('ajax:complete', function() {
      // tasks to do 
      $('.edit_form').hide();
      $('PickZone').val('')
      $('.alert-success').css("display", "block");
      $('.alert-danger').css("display", "none");
    });
  });

  $('#replace_price').click(function() {
    $("#price_form").bind('ajax:complete', function() {
      // tasks to do 
      $('.edit_price_form').hide();
      $('PickZone').val('')
      $('.alert-success').css("display", "block");
      $('.alert-danger').css("display", "none");
    });
  });
	// $('#replace_pick').click(function() {
 //    var sku = $('#pro_sku').val();
 //    var new_pick_zone = $('#new_pick_zone').val();
 //    $.ajax({
 //      url: "products/"+sku,
 //      type: 'PATCH',
 //      dataType: 'script',
 //      data: {
 //        sku: sku,
 //        new_pick_zone: new_pick_zone
 //      },
 //      success: function(response) {
 //      	$('.edit_form').hide();
 //        $('#new_pick_zone').val('')
 //      	$('.alert-success').css("display", "block");
 //      	$('.alert-danger').css("display", "none");
 //      },
 //      error: function(response) {
 //      	$(".edit_form").hide();
 //      	$('.alert-danger').css("display", "block");
 //      	$('.alert-success').css("display", "none");
 //      }
 //    });
	// });

	$('#search').click(function(){
    $('.edit_price_form, .products_list_table').hide();
		$('.alert-success, .alert-danger').css("display", "none")
		var sku = $('#pro_sku').val();
    if(sku != ""){
  		$.ajax({
        url: "products",
        type: 'GET',
        dataType: 'script',
        data: {
          sku: sku
        },
        success: function(response) {
          if(response != null){
            $('.edit_form').show();
            var result = JSON.parse(response);
            $('#product_name').val(result.name);
            $('#product_quantity').val(result.qty_in_stock);
            $('#product_pick_zone').val(result.pick_zone);
          }
          else{
            $(".edit_form").hide();
            $('.alert-danger').css("display", "block");
          }
        },
        error: function(response) {
          $('.alert_message').text("Something went wrong!")
          $('.alert-danger').css("display", "block");
        }
      });
    }
    else{
      $('.alert_message').text("No search found!")
      $('.alert-danger').css("display", "block");
    }
	});

  //edit price
  // $('#replace_price').click(function() {
  //   var sku = $('#pro_sku1').val();
  //   var new_price = $('#new_rrp').val();
  //   $.ajax({
  //     url: "products/"+sku,
  //     type: 'PATCH',
  //     dataType: 'script',
  //     data: {
  //       sku: sku,
  //       new_price: new_price
  //     },
  //     success: function(response) {
  //       $('.edit_price_form').hide();
  //       $('#new_rrp').val('')
  //       $('.alert-success').css("display", "block");
  //       $('.alert-danger').css("display", "none");
  //     },
  //     error: function(response) {
  //       $(".edit_price_form").hide();
  //       $('.alert-danger').css("display", "block");
  //       $('.alert-success').css("display", "none");
  //     }
  //   });
  // });

  $('#search_price').click(function(){
    $('.edit_form').hide();
    $('.alert-success, .alert-danger').css("display", "none")
    var sku = $('#pro_sku1').val();
    if(sku != ""){
      $.ajax({
        url: "products",
        type: 'GET',
        dataType: 'script',
        data: {
          sku: sku
        },
        success: function(response) {
          if(response != null){
            $('.edit_price_form').show();
            $('.products_list_table').show();

            var result = JSON.parse(response);
            $('.name').val(result.name);
            // $('.quantity').val(result.qty_in_stock);
            // $('.price').val(result.rrp);

            //begin: edit price groups
            var group_prices = result.price_groups[0]["PriceGroup"]
            $('.group_prices div').not(':first').not(':last').remove();
            var html1 = '';
            for(var j = 0; j < group_prices.length; j++){
              html1 += '<div class="col-md-4"><input type="text" class="form-control" name="PriceGroup[Multiple][][group]" value="'+ group_prices[j]["Group"] + '" readonly="readonly"></div> <div class="col-md-4"><input type="text" class="form-control" name="PriceGroup[Multiple][][price]" value="'+ group_prices[j]["Price"] + '" readonly="readonly"></div> <div class="col-md-4"><input type="text" class="form-control" name="PriceGroup[Multiple][][new_price]" value="" placeholder="NEW PRICE"></div>';
            }
            $('.group_prices div').first().after(html1);
            //end: edit price groups

            var data = {};
            data.d = result.variants;
            if(data.d.length != 0){
              //begin: product list plus child table
              $('#products_list tr').not(':first').not(':last').remove();
              var html = '';
              for(var i = 0; i < data.d.length; i++)
                html += '<tr><td>' + data.d[i].sku + '</td><td>' + data.d[i].name + '</td><td>' + data.d[i].rrp + '</td><td>'+ data.d[i].qty_in_stock + '</td><td>'+ data.d[i].pick_zone + '</td></tr>';
              $('#products_list tr').first().after(html);
              //end: product list plus child table
            }
            else{
              $(".products_list_table").hide();
            }
          }
          else{
            $(".edit_price_form").hide();
            $('.alert-danger').css("display", "block");
          }
        },
        error: function(response) {
          $('.alert_message').text("Something went wrong!")
          $('.alert-danger').css("display", "block");
        }
      });
    }
    else{
      $('.alert_message').text("No search found!")
      $('.alert-danger').css("display", "block");
    }
  });
});




            
            
<!-- <div class="col-md-4">
                <%#= text_field_tag :group, nil, class: "form-control quantity", disabled: true%>
            </div>

            <div class="col-md-4">
                <%#= text_field_tag :rrp, nil ,class: "form-control price", disabled: true%>
            </div>

            <div class="col-md-4">
                <%#= text_field_tag :new_rrp, nil, class: "form-control", placeholder: "NEW PRICE", value: ""%>
            </div> -->