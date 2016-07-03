class AddUserToGarbageBag < ActiveRecord::Migration
  def change
    add_reference :garbage_bags, :user, index: true, foreign_key: true
  end
end
