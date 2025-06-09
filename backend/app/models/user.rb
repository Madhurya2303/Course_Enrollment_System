class User < ApplicationRecord
  extend Devise::Models
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  has_many :enrollments
  has_many :courses, through: :enrollments
  def confirmed?
    true
  end
end
