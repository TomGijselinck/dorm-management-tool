class User < ActiveRecord::Base
  before_save { self.email = email.downcase }
  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
      format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false}
  has_secure_password
  validates :password, presence: true, length: { minimum: 8 }

  has_many :garbage_bags
  has_one :login
end
