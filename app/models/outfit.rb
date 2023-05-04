class Outfit < ApplicationRecord
  has_many :outfit_clothes, dependent: :destroy
  has_many :clothes, through: :outfit_clothes
end
