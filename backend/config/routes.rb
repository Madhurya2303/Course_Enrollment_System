Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/v1/auth'

  mount_devise_token_auth_for 'Instructor', at: 'api/v1/instructor_auth'

  namespace :api do
    namespace :v1 do
      resources :courses, only: [:index, :create, :destroy] do
        member do
          post :assign_to_instructor
        end
      end

      resources :enrollments, only: [:create, :destroy] 
      resources :instructors, only: [:index]

      get 'my_enrollments', to: 'enrollments#my_enrollments'
      get 'instructor_profile', to: 'instructors#profile'
    end
  end

  root to: 'home#index'
end
