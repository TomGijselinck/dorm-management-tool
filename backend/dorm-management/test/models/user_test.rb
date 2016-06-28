require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: 'John', email: 'johndoe@example.com',
                     password: 'password', password_confirmation: 'password')
  end

  test 'valid user' do
    assert @user.valid?
  end

  test 'name should be present' do
    @user.name = ' '
    assert_not @user.valid?
  end

  test 'email should be present' do
    @user.email = ' '
    assert_not @user.valid?
  end

  test 'name should not be to long' do
    @user.name = 'x' * 51
    assert_not @user.valid?
  end

  test 'email should not be to long' do
    @user.email = 'x' * 244 + '@example.com'
    assert_not @user.valid?
  end

  test 'valid email addresses' do
    valid_addresses = %w[john@example.com JOHN@doe.COM SOME_user@gmail.com
                         first.last@kuleuven.be a+b@doe.com]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test 'email validation should reject invalid email addresses' do
    invalid_addresses = %w[john@example,com john_at_doe.com first.last@example.
                           first.last@ku_leuven.be doe@a+b.com a.b@kul..be]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  test 'email addresses (case-insensitive) should be unique' do
    duplicate_user = @user.dup
    # testing case-insensitive email uniqueness
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end

  test 'password should be present' do
    @user.password = ' '
    assert_not @user.valid?
  end

  test 'password should have a minimum length of 8 characters' do
    @user.password = @user.password_confirmation = 'x' * 7
    assert_not @user.valid?
  end

  test 'password confirmation should equal the given password' do
    @user.password_confirmation = 'wordpass'
    assert_not @user.valid?
  end
end
