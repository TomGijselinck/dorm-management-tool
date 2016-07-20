json.array!(@garbage_bags) do |garbage_bag|
  json.extract! garbage_bag, :id, :name, :status, :dorm_id
  json.responsible do
    json.id garbage_bag.user_id
    json.name User.find(garbage_bag.user_id).name
  end
  json.url garbage_bag_url(garbage_bag, format: :json)
end
