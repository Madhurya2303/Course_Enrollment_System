module Api
  module V1
    class CoursesController < ApplicationController
      before_action :authenticate_user!

      def index
        courses = Course.all
        render json: courses
      end
    end
  end
end
