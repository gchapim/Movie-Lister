class CreateActorsMoviesJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_table :actors_movies, id: false do |t|
      t.integer :person_id
      t.integer :movie_id
    end

    add_index :actors_movies, :person_id
    add_index :actors_movies, :movie_id
  end
end
