module Instructors
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    before_action :validate_instructor_is_not_a_user, only: [:create]

    private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end

    def validate_instructor_is_not_a_user
      if User.find_by(email: sign_up_params[:email]) 
        render json: { errors: ['An account with this email already exists as student.'] }, status: :unprocessable_entity
      end
    end
  end
end
