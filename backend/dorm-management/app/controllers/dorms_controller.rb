class DormsController < ApplicationController
  include RailsApiAuth::Authentication

  before_action :authenticate!
  before_action :set_dorm, only: [:show, :edit, :update,:destroy]

  def index
    render :json => Dorm.all
  end

  def show
  end

  def edit
  end

  def create
    @dorm = Dorm.new(dorm_params)
    if @dorm.save
      render json: {status: :created, location: dorm_url(@dorm)}
    else
      render json: @dorm.errors, status: :unprocessable_entity
    end
  end

  def update
    if @dorm.update(dorm_params)
      render :show, status: :ok, location: @dorm
    else
      render json: @dorm.error, status: :unprocessable_entity
    end
  end

  def destroy
    @dorm.destroy
    head :no_content
  end

  private
    def set_dorm
      @dorm = Dorm.find(params[:id])
    end

    def dorm_params
      params.require(:dorm).permit(:name, :user_id)
    end
end
