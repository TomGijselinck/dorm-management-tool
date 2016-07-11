class CreateGarbageBagDuties < ActiveRecord::Migration
  def change
    create_table :garbage_bag_duties do |t|
      t.datetime :datetime
      t.references :user, index: true, foreign_key: true
      t.references :garbage_bag, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
