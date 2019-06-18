require "neto_client"

class ProductsController < ApplicationController
	before_action :find_product, only:  [:update, :show, :index]

	def index
		@skus = ["001001A07-BLK", "001001A07-BLK-US9", "BARMAH-LADIES-WHTBAND-S", "2001-1343-RMRY", "BARMAH-LADIES", "BARMAH-LADIES-6-M"]
	  # @skus = Product.pluck(:sku)
	end

	def edit
	end

	def update
		items = []

		if params[:from] == "price" #&& product["ParentSKU"].empty?
			price_group = []

			params["PriceGroups"]["PriceGroup"].each{ |e| price_group << {"Group"=>e["group"], "Price"=>e["price"]} unless e["price"].empty?}
		  skus = params[:skus].split(",")
			
			skus.each do |sku|
				items <<
				{"SKU" => sku,
				"PriceGroups": {
			    "PriceGroup": price_group}
			  }
			end
		else
			items << params["product"]
		end


		product = neto_client.update_products items
		render json: :ok
	end

	def show
		puts "SHOW"
		# here, you have to pass JSON directly. for eg: render json: <whatever the JSON result from your API>.
		price_groups=[{"PriceGroup"=>
	     [{"Multiple"=>"",
	       "Price"=>"70.00",
	       "MaximumQuantity"=>"",
	       "MinimumQuantity"=>"",
	       "MultipleStartQuantity"=>"",
	       "Group"=>"Website",
	       "GroupID"=>"1"},
	      {"Multiple"=>"",
	       "Price"=>"80.00",
	       "MaximumQuantity"=>"",
	       "MinimumQuantity"=>"",
	       "MultipleStartQuantity"=>"",
	       "Group"=>"eBay",
	       "GroupID"=>"2"}]
	      }]

	  # @product = neto_client.get_product @product["SKU"] unless @product.nil?
		# puts "show product #{@product}"

	  render json: @product


		# variants = Product.where(parent_sku: @product.sku)
		# render json: @product.as_json.merge(variants: variants, price_groups: price_groups)
	end

	private

	def find_product
		sku = params[:sku]
		return if sku.nil? || sku.empty?
		puts "FIND FROM SEARCH: #{params[:search]}" 
		product = neto_client.get_product sku

		if params[:search] == "price" && product["ParentSKU"].empty?
			puts "SEARCHING CHILDREN"
			children = neto_client.get_children sku
			product.merge!(variants: children)
		end

		# puts "find product #{product}"

		@product = product
	end

	def neto_client
    @client ||= NetoClient.new
  end

  def import_product_sku_without_validations(products)
		skus = CSV.new(open(url))
  	
    transaction do
      import(COLUMNS, products, validate: false, on_duplicate_key_ignore: true)
    end
  end

end
