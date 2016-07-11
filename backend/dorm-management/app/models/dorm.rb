class Dorm < ActiveRecord::Base
  has_many :users

  validates :name, presence: true, length: { maximum: 56 }
end
