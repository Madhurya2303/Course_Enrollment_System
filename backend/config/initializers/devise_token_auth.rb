DeviseTokenAuth.setup do |config|
  config.token_cost = Rails.env.test? ? 4 : 10
  config.enable_standard_devise_support = true
  config.send_confirmation_email = false
  config.change_headers_on_each_request = true
  config.default_callbacks = true
end
