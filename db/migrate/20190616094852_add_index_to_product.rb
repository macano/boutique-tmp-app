class AddIndexToProduct < ActiveRecord::Migration[5.1]
  def change
    add_index :products, [:sku, :upc], unique: true
  end

end
