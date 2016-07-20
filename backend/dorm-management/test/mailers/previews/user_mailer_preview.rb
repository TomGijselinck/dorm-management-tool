# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def new_duty_preview
    UserMailer.new_duty(GarbageBag.first)
  end
end
