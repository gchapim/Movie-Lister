require 'rails_helper'

RSpec.describe 'Movies API', type: :request do
  let!(:movies) { create_list(:movie, 10) }
  let(:movie_id) { movies.first.id }

  describe 'GET /movies' do
    it 'returns movies' do
      get '/movies'

      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json.size).to be(10)
      expect(response.code).to be_eql('200')
    end
  end

  describe 'GET /movies/:id' do
    it 'returns movie' do
      get "/movies/#{movie_id}"

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

  describe 'PUT /movies/:id' do
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
            put "/movies/#{movie.id}", params: movie_params, headers: headers
            movie.reload
          end.to change{ [movie.title, movie.release_year] }.to(['Star Wars III', 2015])

          expect(response.code).to be_eql('200')
        end

        it 'does not update unpermitted params' do
          expect do
            put "/movies/#{movie.id}", params: movie_params, headers: headers
          end.not_to change{ movie.release_year }

          expect(response.code).to be_eql('200')
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'does not update' do
          put "/movies/#{movie.id}", params: movie_params, headers: headers

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
            post "/movies", params: movie_params, headers: headers
          end.to change{ Movie.count }.by(1)

          expect(response.code).to be_eql('201')
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'create movies' do
          post "/movies", params: movie_params, headers: headers
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
          delete "/movies/#{movie.id}", headers: headers

          expect(Movie.where(id: movie.id).count).to be_eql(0)
          expect(response.code).to be_eql('204')
        end
      end

      context 'given invalid authentication headers' do
        let(:headers) { { 'Authorization' => 'INVALID_TOKEN' } }

        it 'create movies' do
          delete "/movies/#{movie.id}", headers: headers
          expect(response.code).to be_eql('401')
        end
      end
    end
  end
end
