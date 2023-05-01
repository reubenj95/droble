class CreateOutfitClothes < ActiveRecord::Migration[7.0]
  def change
    create_table :outfit_clothes do |t|

      t.timestamps
    end
  end
end
