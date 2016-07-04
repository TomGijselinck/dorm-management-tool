class GarbageBag < ActiveRecord::Base
  validates :name, presence: true, length: { maximum: 50}, uniqueness: true
  validates :status, presence: true
  validates_presence_of :user, message: 'user should exist'
  validates_inclusion_of :status, :in => %w( ok full),
                         message: 'status should be either ok or full'
  belongs_to :user
end
