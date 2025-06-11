module Api
  module V1
    class EnrollmentsController < ApplicationController
      before_action :authenticate_user!
      def create
        if current_user.enrollments.exists?(course_id: params[:course_id])
          render json: { success: false, message: "Already enrolled" }, status: :unprocessable_entity
        else
          enrollment = current_user.enrollments.build(course_id: params[:course_id])
          if enrollment.save
            render json: { success: true, message: "Enrolled successfully" }, status: :created
          else
            render json: { success: false, errors: enrollment.errors.full_messages }, status: :unprocessable_entity
          end
        end
      end


      def my_enrollments
        courses = current_user.courses
        render json: courses, status: :ok
      end

      
      def destroy
        enrollment = current_user.enrollments.find_by(course_id: params[:id])

        if enrollment
          enrollment.destroy
          render json: { success: true, message: "Unenrolled successfully" }, status: :ok
        else
          render json: { success: false, message: "Enrollment not found" }, status: :not_found
        end
      end
    end
  end
end
