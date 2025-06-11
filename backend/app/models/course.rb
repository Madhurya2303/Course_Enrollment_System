class Course < ApplicationRecord
  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments, source: :user
  belongs_to :instructor, optional: true

  validates :title, uniqueness: true 
  def students_count
    enrollments.count
  end
end
