require 'test_helper'

class DormTest < ActiveSupport::TestCase

  def setup
    @dorm = Dorm.new(name: 'Awesome Dorm')
  end

  test 'valid dorm' do
    assert @dorm.valid?
  end

  test 'name should be present' do
    @dorm.name = ''
    assert_not @dorm.valid?
  end

  test 'name should not be too long' do
    @dorm.name = 'a' * 57
    assert_not @dorm.valid?
  end

end