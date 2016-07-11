class AddDormToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :dorm, index: true, foreign_key: true
  end
end
