class List < ApplicationRecord
  acts_as_list scope: :user

  belongs_to :user

  has_many :cards, -> { order(position: :asc) }, dependent: :destroy

  validates :name, presence: true
end
