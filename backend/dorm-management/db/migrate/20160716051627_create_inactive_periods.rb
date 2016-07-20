class CreateInactivePeriods < ActiveRecord::Migration
  def change
    create_table :inactive_periods do |t|
      t.date :start
      t.date :end

      t.timestamps null: false
    end
  end
end
