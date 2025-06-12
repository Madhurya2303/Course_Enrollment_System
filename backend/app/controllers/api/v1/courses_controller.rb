class Api::V1::CoursesController < ApplicationController
  before_action :authenticate_instructor!, only: [:assign_to_instructor]
  before_action :authenticate_user!, only: [:create, :destroy]
  before_action :authenticate_admin!, only: [:create, :destroy]

  def index
    courses = Course.includes(:instructor, :enrollments).order(created_at: :desc)

    render json: courses.map { |course|
      {
        id: course.id,
        title: course.title,
        description: course.description,
        credit_hours: course.credit_hours,
        capacity: course.capacity,
        instructor_id: course.instructor_id,
        students_count: course.students_count,
        instructor_name: course.instructor&.name
      }
    }
  end

  def create
    course = Course.new(course_params)

    if course.save
      render json: {
        id: course.id,
        title: course.title,
        description: course.description,
        capacity: course.capacity,
        credit_hours: course.credit_hours,
        instructor_name: course.instructor&.name
      }, status: :created
    else
      Rails.logger.debug(course.errors.full_messages) # Add this
      render json: { errors: course.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def destroy
    course = Course.find_by(id: params[:id])
    if course
      course.destroy
      render json: { message: "Course deleted successfully." }, status: :ok
    else
      render json: { error: "Course not found." }, status: :not_found
    end
  end

  def assign_to_instructor
    course = Course.find(params[:id])

    if course.instructor_id.present?
      return render json: { error: 'This course is already assigned to an instructor.' }, status: :unprocessable_entity
    end

    course.instructor_id = current_instructor.id
    if course.save
      render json: {
        id: course.id,
        title: course.title,
        instructor_name: current_instructor.name,
        message: 'Course assigned successfully.'
      }, status: :ok
    else
      render json: { error: course.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def course_params
    params.require(:course).permit(:title, :description, :instructor_id, :capacity, :credit_hours)
  end

  def authenticate_admin!
    unless current_user && current_user.role == 'admin'
      render json: { error: 'Only admins can perform this action.' }, status: :unauthorized
    end
  end
end
