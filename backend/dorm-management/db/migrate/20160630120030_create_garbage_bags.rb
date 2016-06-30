class CreateGarbageBags < ActiveRecord::Migration
  def change
    create_table :garbage_bags do |t|
      t.string :name
      t.string :status

      t.timestamps null: false
    end
  end
end
