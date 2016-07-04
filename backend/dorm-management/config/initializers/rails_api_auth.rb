
RailsApiAuth.tap do |raa|
  raa.user_model_relation = :user

  # during development, set to true in production! (TODO)
  raa.force_ssl = false
end