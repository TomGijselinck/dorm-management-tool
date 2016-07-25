# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def new_duty_preview
    UserMailer.new_duty(GarbageBag.first)
  end

  def garbage_full_preview
    UserMailer.garbage_bag_full(GarbageBag.first)
  end

  def transferred_duty_preview
    UserMailer.transferred_duty(GarbageBag.first, User.last)
  end
end
