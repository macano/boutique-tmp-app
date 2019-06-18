require "httparty"

class NetoClient

  def initialize #url, api_key
    #required args
    url = "https://www.boutiqueretailer.com.au/do/WS/NetoAPI"
    api_key = "lTamUhxj15dI2A1lzk0RL76PVXOVUrMB"
    
    @neto_url = url
    #optional args
    @header_args ={
      "Accept"      => "application/json",
      "Content-Type"=> "application/json",
      "NETOAPI_KEY" => api_key
    }
    @body_defaults = {
          "IsActive"=> ["True"],
          "OutputSelector"=> [
              "ID",
              "SKU",
              "UPC",
              "PickZone",
              "ParentSKU",
              "Name",
              "Brand",
              "Description",
              "Active",
              "Categories",
              "PriceGroups",
              "WarehouseQuantity"
          ]
    }
  end

  def get_product sku
    return if sku.nil? || sku.empty?
    query = {"SKU" => sku } 
    puts "QUERY #{query}"
    response = do_request :post, 'GetItem', query
    response.parsed_response["Item"].first
  end

  def get_children parent_sku
    return if parent_sku.nil? || parent_sku.empty?
    query = {"ParentSKU" => parent_sku } 
    response = do_request :post, 'GetItem', query
    response.parsed_response["Item"]
  end


  def update_product attributes={}
    do_request :post, 'UpdateItem', attributes
  end

  def update_products attributes=[]
    
    response = do_request :post, 'UpdateItem', attributes

    response
    # if response["Ack"]
    #   response["Item"]
    # else
    #   response["Messages"]
    # end
  end

  protected

  #Internal methods: Append data as query params to an endpoint
  def do_request method, action, query={}
    url = @neto_url
    options = { }
    header_action = {
      "NETOAPI_ACTION"=> action
    }
    #set headers
    options[:headers] = @header_args.merge(header_action)
    #set body
    case action
    when 'GetItem'
      if query.empty?
        options.merge!(body: {"Filter"=> @body_defaults}.to_json)
      else 
        body_args = @body_defaults.merge(query) 
        options.merge!(body: {"Filter"=> body_args}.to_json)
      end    
    when 'UpdateItem'
      options.merge!(body: {"Item"=> query}.to_json) 
    end
    HTTParty.send(method, url, options)
  end
end

# update
# {
#   "SKU": "SHIRT-RED",
#   "PickZone": "M6D8"
#   "DefaultPrice": "29.95"
# }

# [
#   {"SKU": "BARMAH-LADIES",
#    "PriceGroups": 
#     {"PriceGroup": 
#       [{"Group": "Website",
#         "Price": "55.00"},
#        {"Group": "eBay",
#         "Price": "55.00"}
#       ]
#     }
#   },
#   {"SKU": "BARMAH-LADIES-6-M",
#    "PriceGroups": 
#     {"PriceGroup": 
#       [{"Group": "Website",
#         "Price": "55.00"},
#        {"Group": "eBay",
#         "Price": "55.00"}
#       ]
#     }
#   }
# ]
