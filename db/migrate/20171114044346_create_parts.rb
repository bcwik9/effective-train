class CreateParts < ActiveRecord::Migration[5.0]
  def change
    create_table :parts do |t|
      t.string :vendor_part_id, required: true
      t.references :main_part, index: true
      t.timestamps
    end
    add_index :parts, :vendor_part_id
  end
end
