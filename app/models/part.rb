class Part < ApplicationRecord
  has_many :components, class_name: "Part", foreign_key: "main_part_id"
  belongs_to :main_part, class_name: "Part", required: false

  validates :vendor_part_id, presence: true
end
