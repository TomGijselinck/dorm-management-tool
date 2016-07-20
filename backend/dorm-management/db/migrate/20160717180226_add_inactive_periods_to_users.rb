class AddInactivePeriodsToUsers < ActiveRecord::Migration
  def change
    add_reference :inactive_periods, :user, index: true, foreign_key: true
  end
end
