class CorsController < ApplicationController
  def preflight
    begin
      http_request_verb = request.headers['Access-Control-Request-Method']
      # You should add/remove HTTP methods that you want/do not want to support
      raise unless %w(PUT PATCH DELETE).include? http_request_verb

      # This line will raise an exception if the path does not resolve to any controller/action.
      details = Rails.application.routes.recognize_path(request.original_fullpath, :method => http_request_verb.downcase.to_sym)

      # details looks something like this { :controller => "posts", :action => "index" }

      # Convert to the controller class name (inactive_periods => InactivePeriodsController)
      controller_class_name = details[:controller].camelize + 'Controller'
      # Since we recorded the action names as symbol, we should convert it to symbol here
      action_name = details[:action].to_sym

      # If this statement returns true, then CORS is allowed
      if eval(controller_class_name).cors_allowed_actions.include?(action_name)
        headers['Access-Control-Allow-Origin']  = request.headers['Origin']
        headers['Access-Control-Allow-Methods'] = http_request_verb
        # Change this to something smaller while you are debugging
        headers['Access-Control-Max-Age']       = '1728000'
        # Change this to the list of accepted headers, or remove it if you do not accept any.
        headers['Access-Control-Allow-Headers'] = request.headers['Access-Control-Request-Headers']
      end
    rescue
    end

    # Render empty stuff since preflight requests care only about the headers
    render :text => '', :content_type => 'text/plain'
  end
end
