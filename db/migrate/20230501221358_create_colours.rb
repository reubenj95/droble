class CreateColours < ActiveRecord::Migration[7.0]
  def change
    create_table :colours do |t|
      t.string :name
      t.string :rgb
      t.string :yuv
      t.string :complementary

      t.timestamps
    end
  end
end
