# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_01_223853) do
  create_table "brands", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clothes", force: :cascade do |t|
    t.string "description"
    t.date "last_worn"
    t.string "colour"
    t.string "integer"
    t.integer "brand"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "colours", force: :cascade do |t|
    t.string "name"
    t.string "rgb"
    t.string "yuv"
    t.string "complementary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "occasions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "outfit_clothes", force: :cascade do |t|
    t.integer "clothe_id", null: false
    t.integer "outfit_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clothe_id"], name: "index_outfit_clothes_on_clothe_id"
    t.index ["outfit_id"], name: "index_outfit_clothes_on_outfit_id"
  end

  create_table "outfits", force: :cascade do |t|
    t.string "name"
    t.integer "occasion"
    t.integer "season"
    t.string "image"
    t.datetime "last_worn"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "seasons", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "outfit_clothes", "clothes"
  add_foreign_key "outfit_clothes", "outfits"
end
