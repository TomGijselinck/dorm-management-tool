require 'test_helper'

class InactiveWeeksControllerTest < ActionController::TestCase
  setup do
    @inactive_week = inactive_weeks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:inactive_weeks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create inactive_week" do
    assert_difference('InactiveWeek.count') do
      post :create, inactive_week: { end: @inactive_week.end, number: @inactive_week.number, start: @inactive_week.start }
    end

    assert_redirected_to inactive_week_path(assigns(:inactive_week))
  end

  test "should show inactive_week" do
    get :show, id: @inactive_week
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @inactive_week
    assert_response :success
  end

  test "should update inactive_week" do
    patch :update, id: @inactive_week, inactive_week: { end: @inactive_week.end, number: @inactive_week.number, start: @inactive_week.start }
    assert_redirected_to inactive_week_path(assigns(:inactive_week))
  end

  test "should destroy inactive_week" do
    assert_difference('InactiveWeek.count', -1) do
      delete :destroy, id: @inactive_week
    end

    assert_redirected_to inactive_weeks_path
  end
end
