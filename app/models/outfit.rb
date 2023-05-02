class Outfit < ApplicationRecord
  has_many :outfit_clothes
  has_many :clothes, through: :outfit_clothes
end
