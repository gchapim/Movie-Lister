class ApplicationController < ActionController::API
  before_action :authenticate, except: %i(index show)

  private

  def authenticate
    # comparing only if token is equal to 'VALID_TOKEN'. In real life an authentication method should be used
    'VALID_TOKEN' == auth_token || unauthorized
  end

  def unauthorized
    render json: { error: 'Not Authorized' }, status: :unauthorized
  end

  def auth_token
    request.headers['Authorization']
  end
end
