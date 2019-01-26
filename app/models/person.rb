class Person < ApplicationRecord
  has_and_belongs_to_many :movies_as_actor, join_table: :actors_movies, class_name: 'Movie'
  has_and_belongs_to_many :movies_as_producer, join_table: :producers_movies, class_name: 'Movie'
  has_and_belongs_to_many :movies_as_director, join_table: :directors_movies, class_name: 'Movie'

  validates_presence_of :last_name, :first_name

  def full_name
    [first_name, last_name].join(' ')
  end
end
