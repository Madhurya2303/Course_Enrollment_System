Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    namespace :v1 do
      # get 'my_enrollments', to: 'enrollments#my_enrollments'
      resources :courses, only: [:index]
      resources :enrollments, only: [:create, :destroy] 
      get 'my_enrollments', to: 'enrollments#my_enrollments'
    end
  end

  root to: 'home#index'
end