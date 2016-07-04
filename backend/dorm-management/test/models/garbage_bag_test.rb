require 'test_helper'

class GarbageBagTest < ActiveSupport::TestCase

  def setup
    @user = User.create(name: 'John', email: 'johndoe@example.com',
                        password: 'password', password_confirmation: 'password')
    @garbage_bag = GarbageBag.new(name: 'Green', status: 'ok',
                                  user_id: @user.id)
  end
  
  test 'valid garbage bag' do
    assert @garbage_bag.valid?
  end

  test 'name should be present' do
    @garbage_bag.name = ''
    assert_not @garbage_bag.valid?
  end

  test 'status should be present' do
    @garbage_bag.status = ''
    assert_not @garbage_bag.valid?
  end

  test 'user id should be of an existing user' do
    @garbage_bag.user_id = -1
    assert_not @garbage_bag.valid?
  end

  test 'status should be either ok or full' do
    @garbage_bag.status = 'I think it is full'
    assert_not @garbage_bag.valid?
  end

  test 'name should not be too long' do
    @garbage_bag.name = 'x' * 51
    assert_not @garbage_bag.valid?
  end

  test 'name should be unique' do
    duplicate_garbage_bag = @garbage_bag.dup
    @garbage_bag.save
    assert_not duplicate_garbage_bag.valid?
  end
end
