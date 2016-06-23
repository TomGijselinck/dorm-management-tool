json.array!(@inactive_weeks) do |inactive_week|
  json.extract! inactive_week, :id, :start, :end, :number
  json.url inactive_week_url(inactive_week, format: :json)
end
