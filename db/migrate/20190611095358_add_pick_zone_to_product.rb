class AddPickZoneToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :pick_zone, :string
  end
end
