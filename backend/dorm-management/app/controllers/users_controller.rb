require 'jwt'

class UsersController < ApplicationController

  before_action 'check_for_valid_auth_token', except: [:create, :get_token]
  before_action :set_user, only: [:show, :edit, :update, :destroy, :duties,
                                  :inactive_periods, :garbage_bags]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  def me
    @user = User.find_by_email(params[:email])
    respond_to do |format|
      format.json { render :show }
    end
  end

  # POST /users
  # POST /users.json
  def create
    new_params = user_params
    if params['user']['dorm_name']
      dorm = Dorm.find_by_name params['user']['dorm_name']
      new_params[:dorm_id] = dorm.id
    end
    @user = User.new(new_params)
    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def duties
    render json: @user.garbage_bag_duties
  end

  def garbage_bags
    render json: @user.garbage_bags
  end

  def inactive_periods
    render json: @user.inactive_periods
  end

  def get_token
    if params['id']
      @user = User.find_by_id params['id']
    elsif user_params['email']
      @user = User.find_by_email user_params['email']
    end
    if @user && @user.authenticate(user_params['password'])
      payload = { :id => @user.id, :exp => 7.days.from_now.to_i }
      jwt = JWT.encode(payload, ENV['API_TOKEN_SECRET'])
      render json: { token: jwt }, status: :ok
    else
      render json: { errors: 'The given credentials are incorrect' },
             status: :unauthorized
    end
  end

  def valid_token
    puts @payload[:id], params[:id]
    if check_for_valid_auth_token && @payload[:id].to_i.equal?(params[:id].to_i)
      render json: {'status': 'valid token'}, status: :ok
    else
      render json: {'status': 'not a valid token'}, status: :unauthorized
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation, :dorm_id)
    end

end
