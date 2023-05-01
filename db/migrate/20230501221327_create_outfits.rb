class CreateOutfits < ActiveRecord::Migration[7.0]
  def change
    create_table :outfits do |t|
      t.string :name
      t.integer :occasion
      t.integer :season
      t.string :image

      t.timestamps
    end
  end
end
