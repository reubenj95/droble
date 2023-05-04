class Clothe < ApplicationRecord
  has_many :outfit_clothes, dependent: :destroy
  has_many :outfits, through: :outfit_clothes
end
