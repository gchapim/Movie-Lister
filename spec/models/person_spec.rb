require 'rails_helper'

RSpec.describe Person, type: :model do
  describe 'validations' do
    let(:person) { Person.new(last_name: 'Chapim', first_name: 'Gustavo') }

    context 'given no last_name' do
      before do
        person.last_name = ''
      end

      it 'does not save' do
        expect(person.valid?).to be_falsey
      end
    end

    context 'given no first_name' do
      before do
        person.first_name = ''
      end

      it 'does not save' do
        expect(person.valid?).to be_falsey
      end
    end

    context 'given everything correct' do
      it 'is valid' do
        expect(person.valid?).to be_truthy
      end
    end
  end

  describe '#full_name' do
    context 'given a first name and a last name' do
      let(:person) { Person.new(first_name: 'Joan', last_name: 'Soares') }
      it 'returns full name' do
        expect(person.full_name).to be_eql("#{person.first_name} #{person.last_name}")
      end
    end
  end
end
