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

  $('#search_location').click(function(){

    $('.edit_price_form, .products_list_table').hide();
    $('.alert-success, .alert-danger').css("display", "none")

    var sku = $('#pro_sku').val();

    if(sku != ""){
      $.ajax({
        url: "products",
        type: 'GET',
        dataType: 'script',
        data: {
          sku: sku,
          search: 'location'
        },
        success: function(response) {
          if(response != null){
            $('.edit_form').show();
            var result = JSON.parse(response);
            $('.sku').val(result.SKU);
            $('#product_name').val(result.Name);
            $('#product_quantity').val(result.WarehouseQuantity.Quantity);
            $('#product_pick_zone').val(result.PickZone);
            if (result.ParentSKU == "") {
              $('#new_pick_zone').attr("disabled", "true");
              $('.alert_message').text("Pick Zone can't be updated for a Parent SKU!")
              $('.alert-danger').css("display", "block");
            }
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
      $('.alert_message').text("Require SKU")
      $('.alert-danger').css("display", "block");
    }
	});

  $('#search_price').click(function(){
    $('.edit_form').hide();
    $('.alert-success, .alert-danger').css("display", "none")
    var sku = $('#pro_sku1').val();
    if(sku != ""){
      $.ajax({
        url: 'products',
        type: 'GET',
        dataType: 'script',
        data: {
          sku: sku,
          search: 'price'
        },
        success: function(response) {
          if(response != null){
            $('.edit_price_form').show();
            $('.products_list_table').show();

            var result = JSON.parse(response);
            var skus = [];
            $('.name').val(result.Name);
            $('.sku').val(result.SKU);
            // $('.quantity').val(result.qty_in_stock);
            // $('.price').val(result.rrp);

            //begin: edit price groups
            var group_prices = result.PriceGroups[0].PriceGroup
            $('.group_prices div').not(':first').not(':last').remove();
            $('#products_price_title tr').not(':first').remove();

            var html1 = '';
            var html_title = '<tr><th>SKU</th><th>Quantity</th>';
            for(var j = 0; j < group_prices.length; j++){
              html1 += '<div class="col-md-4"><input type="text" class="form-control" name="PriceGroups[PriceGroup][][group]" value="'+ group_prices[j]["Group"] + '" readonly="readonly"></div> <div class="col-md-4"><input type="text" class="form-control" name="old_price" value="'+ group_prices[j]["Price"] + '" readonly="readonly"></div> <div class="col-md-4"><input type="text" class="form-control" name="PriceGroups[PriceGroup][][price]" value="" placeholder="NEW PRICE"></div>';
              html_title += '<th>' + group_prices[j]["Group"]+ '</th>'
            }
            html_title += '</tr>'
            $('.group_prices div').first().after(html1);
            $('.group_prices div:last').remove();

            $('#products_price_title tr').first().after(html_title);

            //end: edit price groups

            var data = {};
            data.d = result.variants ? result.variants : [];
            if(data.d.length != 0){
              skus = result.variants.map(e => e.SKU);
              //begin: product list plus child table
              $('#products_list tr').not(':first').remove();
              var html = '';
              var price_group = [];
              for(var i = 0; i < data.d.length; i++){
                qty = data.d[i].WarehouseQuantity.Quantity ? data.d[i].WarehouseQuantity.Quantity : "-"
                html += '<tr><td>' + data.d[i].SKU + '</td><td>'+ qty + '</td>'
                price_group = data.d[i].PriceGroups[0].PriceGroup
                for(var j = 0; j < price_group.length; j++) {
                  html += '<td>'+ price_group[j]["Price"] + '</td>';
                }
                html += '</tr>'
              }
              $('#products_list tr').first().after(html);
              //end: product list plus child table
            }
            else{
              $(".products_list_table").hide();
            }
            skus.push(sku)
            $('#skus').val(skus);
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
      $('.alert_message').text("Require SKU!")
      $('.alert-danger').css("display", "block");
    }
  });
});

