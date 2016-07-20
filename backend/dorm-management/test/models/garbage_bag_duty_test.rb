require 'test_helper'

class GarbageBagDutyTest < ActiveSupport::TestCase

  def setup
    @user = User.create(name: 'John', email: 'johndoe@example.com',
                        password: 'password', password_confirmation: 'password')
    @garbage_bag = GarbageBag.create(name: 'Green', status: 'ok',
                                  user_id: @user.id)
    @garbage_bag_duty = GarbageBagDuty.new(datetime: '2016-07-11 13:31',
                                           user_id: @user.id,
                                           garbage_bag_id: @garbage_bag.id)
  end

  test 'valid user' do
    assert @user.valid?
  end

  test 'valid garbage bag' do
    assert @garbage_bag.valid?
  end

  test 'valid garbage bag duty' do
    assert @garbage_bag_duty.valid?
  end

  test 'datetime should be present' do
    @garbage_bag_duty.datetime = ''
    assert_not @garbage_bag_duty.valid?
  end

  test 'a user should be present' do
    @garbage_bag_duty.user_id = ''
    assert_not @garbage_bag_duty.valid?
  end

  test 'an existing user should be present' do
    @garbage_bag_duty.user_id = -1
    assert_not @garbage_bag_duty.valid?
  end

  test 'a garbage bag should be present' do
    @garbage_bag_duty.garbage_bag_id = ''
    assert_not @garbage_bag_duty.valid?
  end

  test 'an existing garbage bag should be present' do
    @garbage_bag_duty.garbage_bag_id = -1
    assert_not @garbage_bag_duty.valid?
  end

end
