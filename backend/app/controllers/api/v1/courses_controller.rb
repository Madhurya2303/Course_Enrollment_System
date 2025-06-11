class Api::V1::CoursesController < ApplicationController
  def index
    courses = Course.includes(:enrollments).order(created_at: :desc)

    render json: courses.map { |course|
      {
        id: course.id,
        title: course.title,
        description: course.description,
        credit_hours: course.credit_hours,
        capacity: course.capacity,
        students_count: course.students_count,
        instructor_name: course.instructor&.name
      }
    }
  end

  def create
    course = Course.new(course_params)
    if course.save
      render json: course, status: :created
    else
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

  private

  def course_params
    params.require(:course).permit(:title, :description, :instructor_id, :capacity, :credit_hours)
  end
end
