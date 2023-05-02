class CreateOutfitClothes < ActiveRecord::Migration[7.0]
  def change
    create_table :outfit_clothes do |t|
      t.integer :clothes_id
      t.integer :outfit_id
      t.timestamps
    end
  end
end
