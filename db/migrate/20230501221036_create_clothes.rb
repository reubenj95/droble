class CreateClothes < ActiveRecord::Migration[7.0]
  def change
    create_table :clothes do |t|
      t.string :description
      t.date :last_worn
      t.string :colour
      t.string :integer
      t.integer :brand
      t.string :image

      t.timestamps
    end
  end
end
