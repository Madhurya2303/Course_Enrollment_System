module Instructors
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    before_action :validate_instructor_secret, only: [:create]

    private

    def validate_instructor_secret
      unless params[:instructor_secret] == '@instructor123'
        render json: { errors: ['Invalid instructor secret code'] }, status: :unprocessable_entity
      end
    end

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end

    def account_update_params
      params.permit(:email, :password, :password_confirmation, :name)
    end
  end
end
