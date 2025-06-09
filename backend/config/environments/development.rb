# # # require "active_support/core_ext/integer/time"

# # # Rails.application.configure do
# # #   config.enable_reloading = true
# # #   config.eager_load = false
# # #   config.consider_all_requests_local = true
# # #   config.server_timing = true
# # #   if Rails.root.join("tmp/caching-dev.txt").exist?
# # #     config.action_controller.perform_caching = true
# # #     config.action_controller.enable_fragment_cache_logging = true
# # #     config.public_file_server.headers = { "cache-control" => "public, max-age=#{2.days.to_i}" }
# # #   else
# # #     config.action_controller.perform_caching = false
# # #   end
# # #   config.cache_store = :memory_store
# # #   config.active_storage.service = :local
# # #   config.action_mailer.raise_delivery_errors = false
# # #   config.action_mailer.perform_caching = false
# # #   config.action_mailer.default_url_options = { host: "localhost", port: 3000 }
# # #   config.active_support.deprecation = :log
# # #   config.active_record.migration_error = :page_load
# # #   config.active_record.verbose_query_logs = true
# # #   config.active_record.query_log_tags_enabled = true
# # #   config.active_job.verbose_enqueue_logs = true
# # #   config.action_view.annotate_rendered_view_with_filenames = true
# # #   config.action_controller.raise_on_missing_callback_actions = true
# # # end


# # require "active_support/core_ext/integer/time"

# # Rails.application.configure do
# #   config.enable_reloading = true
# #   config.eager_load = false
# #   config.consider_all_requests_local = true
# #   config.server_timing = true

# #   if Rails.root.join("tmp/caching-dev.txt").exist?
# #     config.action_controller.perform_caching = true
# #     config.action_controller.enable_fragment_cache_logging = true
# #     config.public_file_server.headers = {
# #       "cache-control" => "public, max-age=#{2.days.to_i}"
# #     }
# #   else
# #     config.action_controller.perform_caching = false
# #   end

# #   config.cache_store = :memory_store
# #   config.active_storage.service = :local

# #   config.action_mailer.raise_delivery_errors = false
# #   config.action_mailer.perform_caching = false
# #   config.action_mailer.default_url_options = { host: "localhost", port: 3000 }

# #   config.active_support.deprecation = :log
# #   config.active_record.migration_error = :page_load
# #   config.active_record.verbose_query_logs = true
# #   config.active_record.query_log_tags_enabled = true
# #   config.active_job.verbose_enqueue_logs = true
# #   config.action_view.annotate_rendered_view_with_filenames = true

# #   # REMOVE this line for Rails 8:
# #   # config.action_controller.raise_on_missing_callback_actions = true
# # end


# require "active_support/core_ext/integer/time"

# Rails.application.configure do
#   # Enable code reloading without restarting the server
#   config.enable_reloading = true

#   # Do not eager load code on boot.
#   config.eager_load = false

#   # Show full error reports.
#   config.consider_all_requests_local = true

#   # Server timing
#   config.server_timing = true

#   # Caching
#   if Rails.root.join("tmp/caching-dev.txt").exist?
#     config.public_file_server.headers = {
#       "Cache-Control" => "public, max-age=#{2.days.to_i}"
#     }
#     config.cache_store = :memory_store
#   else
#     config.cache_store = :null_store
#   end

#   # Store uploaded files on the local file system (see config/storage.yml for options).
#   config.active_storage.service = :local

#   # Don't care if the mailer can't send.
#   config.action_mailer.raise_delivery_errors = false

#   config.action_mailer.perform_caching = false

#   config.action_mailer.default_url_options = { host: "localhost", port: 3000 }

#   # Print deprecation notices to the Rails logger.
#   config.active_support.deprecation = :log

#   # Raise exceptions for disallowed deprecations.
#   config.active_support.disallowed_deprecation = :raise

#   # Tell Active Record to log verbose query logs
#   config.active_record.verbose_query_logs = true
#   config.active_record.query_log_tags_enabled = true

#   # Enable job enqueue logs
#   config.active_job.verbose_enqueue_logs = true

#   # Highlight code that triggered database queries in logs.
#   config.active_record.highlight_query_sources = true

#   # Annotate rendered view with file names.
#   config.action_view.annotate_rendered_view_with_filenames = true

#   # 🚫 DO NOT include the following in Rails 8 (they cause errors):
#   # config.action_controller.perform_caching = true
#   # config.action_controller.enable_fragment_cache_logging = true
#   # config.action_controller.raise_on_missing_callback_actions = true
# end



# config/environments/development.rb

require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = true
  config.eager_load = false
  config.consider_all_requests_local = true
  config.server_timing = true

  if Rails.root.join("tmp/caching-dev.txt").exist?
    config.action_controller.perform_caching = true
    config.action_controller.enable_fragment_cache_logging = true
    config.public_file_server.headers = {
      "Cache-Control" => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false
  end

  config.cache_store = :memory_store
  config.active_storage.service = :local

  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.perform_caching = false
  config.action_mailer.default_url_options = { host: "localhost", port: 3000 }

  config.active_support.deprecation = :log
  config.active_record.migration_error = :page_load
  config.active_record.verbose_query_logs = true
  config.active_record.query_log_tags_enabled = true
  config.active_job.verbose_enqueue_logs = true
  config.action_view.annotate_rendered_view_with_filenames = true

  # ✅ DO NOT ADD config.action_controller.raise_on_missing_callback_actions for Rails 8
end
