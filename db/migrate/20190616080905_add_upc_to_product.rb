class AddUpcToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :upc, :string
  end
end
