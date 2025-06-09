# app/controllers/overrides/registrations_controller.rb
class Overrides::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name)
  end

  def account_update_params
    params.permit(:email, :password, :password_confirmation, :name, :current_password)
  end
end
