class Dorm < ActiveRecord::Base
  has_many :users
  has_many :garbage_bags

  validates :name, presence: true, length: { maximum: 56 }
end
