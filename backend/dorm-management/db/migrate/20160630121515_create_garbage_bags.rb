class CreateGarbageBags < ActiveRecord::Migration
  def change
    create_table :garbage_bags do |t|
      t.string :name
      t.string :status
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
