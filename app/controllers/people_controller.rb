class PeopleController < ApplicationController
  before_action :person, only: %i(show update destroy)

  def index
    render json: included_json_person(Person.all), status: :ok
  end

  def show
    render json: included_json_person(@person), status: :ok
  end

  def create
    person = Person.new(permitted_params)

    if person.save
      render json: included_json_person(person), status: :created
    else
      render json: { error: person.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @person.update_attributes(permitted_params)
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
                                   aliases: [],
                                   movies_as_producer: [],
                                   movies_as_actor: [],
                                   movies_as_director: [])
  end

  def person
    @person = Person.find(params[:id])
  end
end
