class User < ApplicationRecord
  extend Devise::Models
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  has_many :enrollments
  has_many :courses, through: :enrollments
  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  def confirmed?
    true
  end
end
