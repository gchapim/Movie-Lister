class MoviesController < ApplicationController
  before_action :movie, only: %i(show update destroy)
  before_action :relation_params, only: :update

  def index
    render json: included_json_movie(Movie.all), status: :ok
  end

  def show
    render json: included_json_movie(@movie), status: :ok
  end

  def create
    @movie = Movie.new(permitted_params)
    relation_params

    if @movie.save
      render json: included_json_movie(@movie), status: :created
    else
      render json: { error: @movie.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @movie.attributes = permitted_params
    if @movie.save
      render json: included_json_movie(@movie), status: :ok
    else
      render json: { error: @movie.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @movie.delete
      render json: nil, status: :no_content
    else
      render json: { error: @movie.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def included_json_movie(association)
    association.as_json(include: { directors: { methods: :full_name },
                                   casting: { methods: :full_name },
                                   producers: {methods: :full_name } },
                        methods: :roman_release_year)
  end

  def permitted_params
    params.require(:movie).permit(:title,
                                  :release_year)
  end

  def relation_params
    relation(@movie.casting, params.dig('movie', 'casting'))
    relation(@movie.directors, params.dig('movie', 'directors'))
    relation(@movie.producers, params.dig('movie', 'producers'))
  end

  def relation(relation, hashed_relation)
    return unless hashed_relation.present?

    relation << hashed_relation.map do |c|
      Person.find(c[:id]) if c[:id]
    end
  end

  def movie
    @movie = Movie.find(params[:id])
  end
end
