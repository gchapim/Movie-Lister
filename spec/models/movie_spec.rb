require 'rails_helper'

RSpec.describe Movie, type: :model do
  describe 'validations' do
    let(:movie) { Movie.new(title: 'Gone with the Wind', release_year: 1939) }

    context 'given no title' do
      before do
        movie.title = ''
      end

      it 'does not save' do
        expect(movie.valid?).to be_falsey
      end
    end

    context 'given no release year' do
      before do
        movie.release_year = nil
      end

      it 'does not save' do
        expect(movie.valid?).to be_falsey
      end
    end

    context 'given invalid release year' do
      before do
        movie.release_year = 10
      end

      it 'does not save' do
        expect(movie.valid?).to be_falsey
      end
    end

    context 'given everything correct' do
      it 'is valid' do
        expect(movie.valid?).to be_truthy
      end
    end
  end

  describe '#roman_release_year' do
    context 'given a movie with year' do
      let(:movie) { Movie.new(release_year: 1980) }

      it 'returns roman release year' do
        expect(movie.roman_release_year).to be_eql('MCMLXXX')
      end
    end
  end
end
