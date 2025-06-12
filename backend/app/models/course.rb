class Course < ApplicationRecord
  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments, source: :user
  belongs_to :instructor, optional: true

  validates :title, presence: true, uniqueness: true
  validates :description, :capacity, :credit_hours, presence: true
  validates :capacity, :credit_hours, numericality: { only_integer: true, greater_than: 0 }

  def students_count
    enrollments.count
  end
end
