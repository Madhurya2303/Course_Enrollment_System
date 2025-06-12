class AddDeviseFieldsToInstructors < ActiveRecord::Migration[7.1]
  def change
    add_column :instructors, :encrypted_password, :string, null: false, default: "" unless column_exists?(:instructors, :encrypted_password)
    add_column :instructors, :provider, :string, null: false, default: "email" unless column_exists?(:instructors, :provider)
    add_column :instructors, :uid, :string, null: false, default: "" unless column_exists?(:instructors, :uid)
    add_column :instructors, :tokens, :json unless column_exists?(:instructors, :tokens)
    add_column :instructors, :instructor_secret, :string unless column_exists?(:instructors, :instructor_secret)

    add_index :instructors, [:uid, :provider], unique: true unless index_exists?(:instructors, [:uid, :provider])
  end
end
