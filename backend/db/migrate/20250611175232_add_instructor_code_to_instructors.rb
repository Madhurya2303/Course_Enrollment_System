class AddInstructorCodeToInstructors < ActiveRecord::Migration[8.0]
  def change
    add_column :instructors, :instructor_code, :string
  end
end
