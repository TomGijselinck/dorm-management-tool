class GarbageBagDuty < ActiveRecord::Base
  has_one :user
  has_one :garbage_bag
end
