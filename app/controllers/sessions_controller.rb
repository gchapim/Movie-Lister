class SessionsController < ApplicationController
  before_action :authenticate

  def auth
    render json: { success: :ok }, status: :ok
  end
end
