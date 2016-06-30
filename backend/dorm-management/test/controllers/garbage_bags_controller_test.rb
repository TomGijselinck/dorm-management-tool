require 'test_helper'

class GarbageBagsControllerTest < ActionController::TestCase
  setup do
    @garbage_bag = garbage_bags(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:garbage_bags)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create garbage_bag" do
    assert_difference('GarbageBag.count') do
      post :create, garbage_bag: { name: @garbage_bag.name, status: @garbage_bag.status }
    end

    assert_redirected_to garbage_bag_path(assigns(:garbage_bag))
  end

  test "should show garbage_bag" do
    get :show, id: @garbage_bag
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @garbage_bag
    assert_response :success
  end

  test "should update garbage_bag" do
    patch :update, id: @garbage_bag, garbage_bag: { name: @garbage_bag.name, status: @garbage_bag.status }
    assert_redirected_to garbage_bag_path(assigns(:garbage_bag))
  end

  test "should destroy garbage_bag" do
    assert_difference('GarbageBag.count', -1) do
      delete :destroy, id: @garbage_bag
    end

    assert_redirected_to garbage_bags_path
  end
end
