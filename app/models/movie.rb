class Movie < ApplicationRecord
  has_and_belongs_to_many :directors, join_table: :directors_movies, class_name: 'Person'
  has_and_belongs_to_many :casting, join_table: :actors_movies, class_name: 'Person'
  has_and_belongs_to_many :producers, join_table: :producers_movies, class_name: 'Person'

  validates_presence_of :title, :release_year
end
