class Movie < ApplicationRecord
  has_and_belongs_to_many :directors, -> { distinct }, join_table: :directors_movies, class_name: 'Person'
  has_and_belongs_to_many :casting, -> { distinct }, join_table: :actors_movies, class_name: 'Person'
  has_and_belongs_to_many :producers, -> { distinct }, join_table: :producers_movies, class_name: 'Person'

  validates_presence_of :title, :release_year
  validates_inclusion_of :release_year, in: 1800..Date.current.year

  def roman_release_year
    release_year.roman
  end
end
