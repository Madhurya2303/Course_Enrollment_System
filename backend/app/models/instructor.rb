class Instructor < ApplicationRecord
  extend Devise::Models
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  has_many :courses
  validates :name, presence: true

  before_create :assign_instructor_code

  private

  def assign_instructor_code
    next_number = Instructor.count + 1
    self.instructor_code = "i#{next_number}"
  end
end
