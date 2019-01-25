FactoryBot.define do
  factory :movie do
    title { Faker::Lorem.word }
    release_year 1999
  end
end
