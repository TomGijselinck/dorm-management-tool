json.array!(@garbage_bags) do |garbage_bag|
  json.extract! garbage_bag, :id, :name, :status, :user_id
  json.url garbage_bag_url(garbage_bag, format: :json)
end
