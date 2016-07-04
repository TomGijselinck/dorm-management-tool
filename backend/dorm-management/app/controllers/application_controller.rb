class ApplicationController < ActionController::Base

  include RailsApiAuth::Authentication

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  before_action :authenticate!
end
