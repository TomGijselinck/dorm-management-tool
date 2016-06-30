json.array!(@garbage_bags) do |garbage_bag|
  json.extract! garbage_bag, :id, :name, :status
  json.responsible User.find(garbage_bag.user_id).name
  json.url garbage_bag_url(garbage_bag, format: :json)
end
