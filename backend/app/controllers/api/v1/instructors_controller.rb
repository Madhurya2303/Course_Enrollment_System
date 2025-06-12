module Api
  module V1
    class InstructorsController < ApplicationController
      before_action :authenticate_instructor!

      def profile
        instructor = current_instructor
        courses = instructor.courses.includes(:enrollments)

        render json: {
          name: instructor.name,
          email: instructor.email,
          courses: courses.map do |course|
            {
              id: course.id,
              title: course.title,
              description: course.description,
              capacity: course.capacity,
              students_count: course.enrollments.count
            }
          end
        }
      end

      def index
        instructors = Instructor.all
        render json: instructors.select(:id, :name)
      end
    end
  end
end
