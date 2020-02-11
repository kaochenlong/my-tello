class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :name
      t.belongs_to :list, null: false, foreign_key: true
      t.integer :position

      t.timestamps
    end
  end
end
