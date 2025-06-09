require_relative "boot"

require "rails"
# Include only the frameworks you need:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "active_storage/engine"
# require "action_cable/engine"
# require "action_mailbox/engine"
# require "action_text/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile
Bundler.require(*Rails.groups)

module CourseEnrollment
  class Application < Rails::Application
    config.load_defaults 8.0

    # ✅ API-only mode
    config.api_only = true

    # ✅ Enable session + cookies support for DeviseTokenAuth
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    config.session_store :cookie_store, key: '_course_enrollment_session'
  end
end
