class UserMailer < ApplicationMailer
  default from: 'dorm.manager.app@gmail.com'

  def new_duty(garbage_bag)
    @garbage_bag = garbage_bag
    @user = User.find(garbage_bag.user_id)
    mail(to: @user.email, subject: 'You have a new duty')
  end

  def garbage_bag_full(garbage_bag)
    @garbage_bag = garbage_bag
    @user = User.find(garbage_bag.user_id)
    mail(to: @user.email, subject: 'Garbage bag full')
  end
end
