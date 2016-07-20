require 'test_helper'

class CorsControllerTest < ActionController::TestCase
  test "should get preflight" do
    get :preflight
    assert_response :success
  end

end
