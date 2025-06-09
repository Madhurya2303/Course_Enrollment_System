class RemoveConfirmableFromUsers < ActiveRecord::Migration[8.0]
  def change
    remove_column :users, :confirmation_token, :string if column_exists?(:users, :confirmation_token)
    remove_column :users, :confirmed_at, :datetime if column_exists?(:users, :confirmed_at)
    remove_column :users, :confirmation_sent_at, :datetime if column_exists?(:users, :confirmation_sent_at)
    remove_column :users, :unconfirmed_email, :string if column_exists?(:users, :unconfirmed_email)
  end
end
