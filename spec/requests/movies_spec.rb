require 'rails_helper'

RSpec.describe 'Movies API', type: :request do
  let!(:movies) { create_list(:movie, 10) }
  let(:movie_id) { movies.first.id }

  describe 'GET /movies' do
    it 'returns movies' do
      get '/api/movies'

      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json.size).to be(10)
      expect(response.code).to be_eql('200')
    end
  end

  describe 'GET /api/movies/:id' do
    it 'returns movie' do
      get "/api/movies/#{movie_id}"

      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json['id']).to be(movies.first.id)

      expect(json.key? 'directors').to be_truthy
      expect(json.key? 'producers').to be_truthy
      expect(json.key? 'casting').to be_truthy
      expect(json['roman_release_year']).to be_present

      expect(response.code).to be_eql('200')
    end
  end

  describe 'PUT /api/movies/:id' do
    context 'given params and a movie' do
      let!(:movie) { create(:movie) }
      let(:movie_params) do
        {
          movie: {
            title: 'Star Wars III',
            release_year: 2015,
            created_at: Time.current
          }
        }
      end

      context 'given valid authentication headers' do
        let(:headers) { { 'Authorization' => 'VALID_TOKEN' } }

        it 'updates movies' do
          expect do
            put "/api/movies/#{movie.id}", params: movie_params, headers: headers
            movie.reload
          end.to change{ [movie.title, movie.release_year] }.to(['Star Wars III', 2015])

          expect(response.code).to be_eql('200')
        end

        it 'does not update unpermitted params' do
          expect do
            put "/api/movies/#{movie.id}", params: movie_params, headers: headers
          end.not_to change{ movie.release_year }

          expect(response.code).to be_eql('200')
        end

        context 'given relation' do
          let!(:person) { create(:person) }
          before do
            movie_params[:movie][:casting] = [{ id: person.id }]
            movie_params[:movie][:directors] = [{ id: person.id }]
            movie_params[:movie][:producers] = [{ id: person.id }]
          end

          it 'updates relation' do
            expect do
              put "/api/movies/#{movie.id}", params: movie_params, headers: headers
              movie.reload
            end.to change{ [movie.directors.count, movie.producers.count, movie.casting.count] }.to([1, 1, 1])
          end
        end

        context 'given existing relation' do
          let!(:person) { create(:person) }
          before do
            movie.update(casting: [person], directors: [person], producers: [person])

            movie_params[:movie][:casting] = [{ id: person.id, _delete: true }]
            movie_params[:movie][:directors] = [{ id: person.id, _delete: true }]
            movie_params[:movie][:producers] = [{ id: person.id, _delete: true }]
          end

          context 'given delete params' do

            it 'deletes relations' do
              expect do
                put "/api/movies/#{movie.id}", params: movie_params, headers: headers
                movie.reload
              end.to change{ [movie.directors.count, movie.producers.count, movie.casting.count] }.to([0, 0, 0])
            end
          end
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'does not update' do
          put "/api/movies/#{movie.id}", params: movie_params, headers: headers

          expect(response.code).to be_eql('401')
        end
      end
    end
  end

  describe 'POST /movies' do
    context 'given params' do
      let(:movie_params) do
        {
          movie: {
            title: 'Star Wars III',
            release_year: 2015
          }
        }
      end

      context 'given valid authentication headers' do
        let(:headers) { { 'Authorization' => 'VALID_TOKEN' } }

        it 'create movies' do
          expect do
            post "/api/movies", params: movie_params, headers: headers
          end.to change{ Movie.count }.by(1)

          expect(response.code).to be_eql('201')
        end

        context 'given relation' do
          let!(:person) { create(:person) }
          before do
            movie_params[:movie][:casting] = [{ id: person.id }]
            movie_params[:movie][:directors] = [{ id: person.id }]
            movie_params[:movie][:producers] = [{ id: person.id }]
          end

          it 'creates with relation' do
            post "/api/movies", params: movie_params, headers: headers

            expect(Movie.last.casting.count).to be_eql 1
            expect(Movie.last.producers.count).to be_eql 1
            expect(Movie.last.directors.count).to be_eql 1
          end
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'create movies' do
          post "/api/movies", params: movie_params, headers: headers
          expect(response.code).to be_eql('401')
        end
      end
    end
  end

  describe 'DELETE /movies' do
    context 'given movie' do
      let(:movie) { create(:movie) }

      context 'given valid authentication headers' do
        let(:headers) { { 'Authorization' => 'VALID_TOKEN' } }

        it 'delete movies' do
          delete "/api/movies/#{movie.id}", headers: headers

          expect(Movie.where(id: movie.id).count).to be_eql(0)
          expect(response.code).to be_eql('204')
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'create movies' do
          delete "/api/movies/#{movie.id}", headers: headers
          expect(response.code).to be_eql('401')
        end
      end
    end
  end
end
