require 'rails_helper'

RSpec.describe 'People API', type: :request do
  let!(:people) { create_list(:person, 10) }
  let(:person_id) { people.first.id }

  describe 'GET /people' do
    it 'returns people' do
      get '/people'

      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json.size).to be(10)
      expect(response.code).to be_eql('200')
    end
  end

  describe 'GET /people/:id' do
    it 'returns person' do
      get "/people/#{person_id}"

      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json['id']).to be(people.first.id)

      expect(json.key? 'movies_as_director').to be_truthy
      expect(json.key? 'movies_as_producer').to be_truthy
      expect(json.key? 'movies_as_actor').to be_truthy

      expect(response.code).to be_eql('200')
    end
  end

  describe 'PUT /people/:id' do
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
            put "/people/#{person.id}", params: person_params, headers: headers
            person.reload
          end.to change{ [person.last_name, person.first_name, person.aliases] }.to(['Armani', 'Giorgio', ['Armani', 'Giorgio']])

          expect(response.code).to be_eql('200')
        end

        it 'does not update unpermitted params' do
          expect do
            put "/people/#{person.id}", params: person_params, headers: headers
          end.not_to change{ person.created_at }

          expect(response.code).to be_eql('200')
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'does not update' do
          put "/people/#{person.id}", params: person_params, headers: headers

          expect(response.code).to be_eql('401')
        end
      end
    end
  end

  describe 'POST /people' do
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
            post "/people", params: person_params, headers: headers
          end.to change{ Person.count }.by(1)

          expect(response.code).to be_eql('201')
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'create people' do
          post "/people", params: person_params, headers: headers
          expect(response.code).to be_eql('401')
        end
      end
    end
  end

  describe 'DELETE /people' do
    context 'given person' do
      let(:person) { create(:person) }

      context 'given valid authentication headers' do
        let(:headers) { { 'Authorization' => 'VALID_TOKEN' } }

        it 'delete people' do
          delete "/people/#{person.id}", headers: headers

          expect(Person.where(id: person.id).count).to be_eql(0)
          expect(response.code).to be_eql('204')
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'create people' do
          delete "/people/#{person.id}", headers: headers
          expect(response.code).to be_eql('401')
        end
      end
    end
  end
end
