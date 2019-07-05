class User < ApplicationRecord

  validates :email, :username, :password_digest, :session_token, presence: true
  validates :email, :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :leagues,
  through: :teams,
  source: :team
  
  has_many :teams


after_initialize :ensure_session_token

attr_reader :password

def self.find_by_credentials(email, username, password)
  user = User.find_by_email(email)
  return nil unless user
  user.is_password?(password) ? user : nil
end

def password=(password)
  @password = password
  self.password_digest = BCrypt::Password.create(password)
end

def is_password?(password)
  BCrypt::Password.new(self.password_digest).is_password?(password)
end

def reset_session_token
  self.session_token = SecureRandom.urlsafe_base64
  self.save!
  self.session_token
end

def ensure_session_token
  self.session_token ||= SecureRandom.urlsafe_base64
end

end
