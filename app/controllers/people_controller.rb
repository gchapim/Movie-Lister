class PeopleController < ApplicationController
  before_action :person, only: %i(show update destroy)
  before_action :relation_params, only: :update

  def index
    render json: included_json_person(Person.all), status: :ok
  end

  def show
    render json: included_json_person(@person), status: :ok
  end

  def create
    @person = Person.new(permitted_params)
    relation_params

    if @person.save
      render json: included_json_person(@person), status: :created
    else
      render json: { error: @person.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @person.attributes = permitted_params

    if @person.save
      render json: included_json_person(@person), status: :ok
    else
      render json: { error: @person.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @person.delete
      render json: nil, status: :no_content
    else
      render json: { error: @person.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def included_json_person(association)
    association.as_json(include: %i(movies_as_producer movies_as_actor movies_as_director), methods: :full_name)
  end

  def permitted_params
    params.require(:person).permit(:last_name,
                                   :first_name,
                                   aliases: [])
  end

  def relation_params
    relation(@person.movies_as_actor, params.dig('person', 'movies_as_actor'))
    relation(@person.movies_as_director, params.dig('person', 'movies_as_director'))
    relation(@person.movies_as_producer, params.dig('person', 'movies_as_producer'))
  end

  def relation(relation, hashed_relation)
    return unless hashed_relation.present?

    relation << hashed_relation.map do |c|
      Movie.find(c[:id]) if c[:id]
    end
  end

  def person
    @person = Person.find(params[:id])
  end
end
