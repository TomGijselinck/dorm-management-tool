class GarbageBagDuty < ActiveRecord::Base
  belongs_to :user
  belongs_to :garbage_bag

  validates :datetime, presence: true
  validates_presence_of :user
  validates_presence_of :garbage_bag
end
