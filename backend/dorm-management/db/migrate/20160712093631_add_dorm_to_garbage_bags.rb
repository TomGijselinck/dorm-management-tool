class AddDormToGarbageBags < ActiveRecord::Migration
  def change
    add_reference :garbage_bags, :dorm, index: true, foreign_key: true
  end
end
