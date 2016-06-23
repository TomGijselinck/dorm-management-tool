class CreateInactiveWeeks < ActiveRecord::Migration
  def change
    create_table :inactive_weeks do |t|
      t.date :start
      t.date :end
      t.integer :number

      t.timestamps null: false
    end
  end
end
