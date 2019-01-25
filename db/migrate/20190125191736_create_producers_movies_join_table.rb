class CreateProducersMoviesJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_table :producers_movies, id: false do |t|
      t.integer :person_id
      t.integer :movie_id
    end

    add_index :producers_movies, :person_id
    add_index :producers_movies, :movie_id
  end
end
