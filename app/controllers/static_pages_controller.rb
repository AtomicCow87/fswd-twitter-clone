class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def login
    render 'login'
  end

  def users
    @users = { user_id: params[:username] }.to_json
    render 'users'
  end
end
