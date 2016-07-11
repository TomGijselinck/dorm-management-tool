json.array!(@users) do |user|
  json.extract! user, :id, :name, :email, :dorm_id
  json.url user_url(user, format: :json)
end
