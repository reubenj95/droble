class CreateOutfitClothes < ActiveRecord::Migration[7.0]
  def change
    create_table :outfit_clothes do |t|
      t.references :clothe, null: false, foreign_key:true
      t.references :outfit, null: false, foreign_key:true
      t.timestamps
    end
  end
end
