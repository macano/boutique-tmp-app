class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :sku, unique: true
      t.integer :qty_in_stock
      t.string :name
      t.string :brand
      t.float :rrp
      t.float :delivery_charge
      t.text :specifies
      t.string :image_url
      t.string :parent_sku

      t.timestamps
    end
  end
end
