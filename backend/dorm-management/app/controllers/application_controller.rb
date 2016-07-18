class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session


  def cors_before_filter
    # Check that the `Origin` field matches our front-end client host
    if /\Ahttps?:\/\/localhost:8000\z/ =~ request.headers['Origin']
      headers['Access-Control-Allow-Origin'] = request.headers['Origin']
    end
  end

  def self.cors_allowed_actions
    @cors_allowed_actions ||= []
  end

  def self.cors_allowed_actions=(arr)
    @cors_allowed_actions = arr
  end

  # allow_cors takes in arbitrarily many symbols representing actions that
  # CORS should be enabled for
  def self.allow_cors(*methods)
    self.cors_allowed_actions += methods
    before_filter :cors_before_filter, :only => methods
    protect_from_forgery with: :null_session, :only => methods
  end

end
