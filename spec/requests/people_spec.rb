require 'rails_helper'

RSpec.describe 'People API', type: :request do
  let!(:people) { create_list(:person, 10) }
  let(:person_id) { people.first.id }

  describe 'GET /api/people' do
    it 'returns people' do
      get '/api/people'

      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json.size).to be_eql(10)
      expect(response.code).to be_eql('200')
    end
  end

  describe 'GET /api/people/:id' do
    it 'returns person' do
      get "/api/people/#{person_id}"

      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json['id']).to be_eql(people.first.id)
      expect(json['full_name']).to be_eql(people.first.full_name)

      expect(json.key? 'movies_as_director').to be_truthy
      expect(json.key? 'movies_as_producer').to be_truthy
      expect(json.key? 'movies_as_actor').to be_truthy

      expect(response.code).to be_eql('200')
    end
  end

  describe 'PUT /api/people/:id' do
    context 'given params and a person' do
      let!(:person) { create(:person) }
      let(:person_params) do
        {
          person: {
            first_name: 'Giorgio',
            last_name: 'Armani',
            aliases: ['Armani', 'Giorgio'],
            created_at: Time.current
          }
        }
      end

      context 'given valid authentication headers' do
        let(:headers) { { 'Authorization' => 'VALID_TOKEN' } }

        it 'updates people' do
          expect do
            put "/api/people/#{person.id}", params: person_params, headers: headers
            person.reload
          end.to change{ [person.last_name, person.first_name, person.aliases] }.to(['Armani', 'Giorgio', ['Armani', 'Giorgio']])

          expect(response.code).to be_eql('200')
        end

        it 'does not update unpermitted params' do
          expect do
            put "/api/people/#{person.id}", params: person_params, headers: headers
          end.not_to change{ person.created_at }

          expect(response.code).to be_eql('200')
        end

        context 'given relation' do
          let!(:movie) { create(:movie) }
          before do
            person_params[:person][:movies_as_producer] = [{ id: movie.id }]
            person_params[:person][:movies_as_director] = [{ id: movie.id }]
            person_params[:person][:movies_as_actor] = [{ id: movie.id }]
          end

          it 'updates relation' do
            expect do
              put "/api/people/#{person.id}", params: person_params, headers: headers
              person.reload
            end.to change{ [person.movies_as_director.count, person.movies_as_producer.count, person.movies_as_actor.count] }.to([1, 1, 1])
          end
        end

        context 'given existing relation' do
          let!(:movie) { create(:movie) }
          before do
            person.update(movies_as_actor: [movie], movies_as_director: [movie], movies_as_producer: [movie])

            person_params[:person][:movies_as_actor] = [{ id: movie.id, _delete: true }]
            person_params[:person][:movies_as_director] = [{ id: movie.id, _delete: true }]
            person_params[:person][:movies_as_producer] = [{ id: movie.id, _delete: true }]
          end

          context 'given delete params' do

            it 'deletes relations' do
              expect do
                put "/api/people/#{person.id}", params: person_params, headers: headers
                person.reload
              end.to change{ [person.movies_as_director.count, person.movies_as_producer.count, person.movies_as_actor.count] }.to([0, 0, 0])
            end
          end
        end

      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'does not update' do
          put "/api/people/#{person.id}", params: person_params, headers: headers

          expect(response.code).to be_eql('401')
        end
      end
    end
  end

  describe 'POST /api/people' do
    context 'given params' do
      let(:person_params) do
        {
          person: {
            last_name: 'Armani',
            first_name: 'Giogio'
          }
        }
      end

      context 'given valid authentication headers' do
        let(:headers) { { 'Authorization' => 'VALID_TOKEN' } }

        it 'create people' do
          expect do
            post "/api/people", params: person_params, headers: headers
          end.to change{ Person.count }.by(1)

          expect(response.code).to be_eql('201')
        end

        context 'given relation' do
          let!(:movie) { create(:movie) }
          before do
            person_params[:person][:movies_as_producer] = [{ id: movie.id }]
            person_params[:person][:movies_as_director] = [{ id: movie.id }]
            person_params[:person][:movies_as_actor] = [{ id: movie.id }]
          end

          it 'creates with relation' do
            post "/api/people", params: person_params, headers: headers

            expect(Person.last.movies_as_producer.count).to be_eql 1
            expect(Person.last.movies_as_actor.count).to be_eql 1
            expect(Person.last.movies_as_director.count).to be_eql 1
          end
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'create people' do
          post "/api/people", params: person_params, headers: headers
          expect(response.code).to be_eql('401')
        end
      end
    end
  end

  describe 'DELETE /api/people' do
    context 'given person' do
      let(:person) { create(:person) }

      context 'given valid authentication headers' do
        let(:headers) { { 'Authorization' => 'VALID_TOKEN' } }

        it 'delete people' do
          delete "/api/people/#{person.id}", headers: headers

          expect(Person.where(id: person.id).count).to be_eql(0)
          expect(response.code).to be_eql('204')
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'create people' do
          delete "/api/people/#{person.id}", headers: headers
          expect(response.code).to be_eql('401')
        end
      end
    end
  end
end
